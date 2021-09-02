import React, { useContext } from 'react';
import { Form, Modal, Input } from 'antd';
import { AppContext } from 'context/AppProvider';
import { addDocument } from 'firebase/services';
import { AuthContext } from 'context/AuthProvider';

function InviteMemberModal() {
  const { isVisibleAddRoom, setIsVisibleAddRoom } = useContext(AppContext);
  const {
    user: { uid },
  } = useContext(AuthContext);
  const [form] = Form.useForm();

  const handleOk = () => {
    addDocument('rooms', { ...form.getFieldsValue(), members: [uid] }); //  // add new room
    form.resetFields(); //reset form value
    setIsVisibleAddRoom(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsVisibleAddRoom(false);
  };

  return (
    <div>
      <Modal title="Add Room" visible={isVisibleAddRoom} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item label="Room Name" name="name">
            <Input placeholder="Enter room name..." />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea placeholder="Enter description..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default InviteMemberModal;
