import React, { useContext, useState, useEffect, useMemo } from 'react';
import { Form, Modal, Select, Spin, Avatar, Empty } from 'antd';
import { debounce } from 'lodash';
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from '@firebase/firestore';
import { AppContext } from 'context/AppProvider';
import { db } from 'firebase/config';

function DebounceSelect({ fetchOptions, debounceTimeout = 300, curMembers, ...props }) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const emptyContent = <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  const loadingContent = <Spin spinning={fetching} size="small" />;

  const debounceFetcher = useMemo(() => {
    const loadOptions = value => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value, curMembers).then(newOptions => {
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions, curMembers]);

  useEffect(() => {
    return () => setOptions([]);
  }, []);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? loadingContent : emptyContent}
      {...props}
    >
      {options.map(opt => (
        <Select.Option key={opt.value} value={opt.value} title={opt.label}>
          <Avatar size="small" src={opt.photoURL}>
            {opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()}
          </Avatar>
          {` ${opt.label}`}
        </Select.Option>
      ))}
    </Select>
  );
}

async function fetchUserList(search, curMembers) {
  const usersQuery = query(
    collection(db, 'users'),
    where('keywords', 'array-contains', search),
    orderBy('displayName'),
    limit(10)
  );
  const usersSnap = await getDocs(usersQuery);
  return usersSnap.docs
    .map(doc => ({
      label: doc.data().displayName,
      value: doc.data().uid,
      photoURL: doc.data().photoURL,
    }))
    .filter(opt => !curMembers.includes(opt.value));
}

function InviteMemberModal() {
  const { isVisibleInvite, setIsVisibleInvite, selectedRoom, selectedRoomId } =
    useContext(AppContext);
  const [value, setValue] = useState([]);
  const [form] = Form.useForm();

  const handleOk = async () => {
    form.resetFields(); // reset form value
    setValue([]);
    setIsVisibleInvite(false);
    const roomRef = doc(db, 'rooms', selectedRoomId);
    await updateDoc(roomRef, {
      members: [...selectedRoom.members, ...value.map(item => item.value)],
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsVisibleInvite(false);
  };

  return (
    <div>
      <Modal
        title="Invite member"
        visible={isVisibleInvite}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <DebounceSelect
            mode="multiple"
            name="search-user"
            label="Member Name"
            value={value}
            placeholder="Enter member name..."
            fetchOptions={fetchUserList}
            onChange={newValue => setValue(newValue)}
            style={{ width: '100%' }}
            curMembers={selectedRoom?.members}
          />
        </Form>
      </Modal>
    </div>
  );
}

export default InviteMemberModal;
