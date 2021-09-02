import React, { useContext, useMemo, useState } from 'react';
import { Button, Tooltip, Avatar, Form, Input, Alert } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

import { AppContext } from 'context/AppProvider';
import { AuthContext } from 'context/AuthProvider';
import { addDocument } from 'firebase/services';
import { useFileStore } from 'hooks/useFirestore';
import Message from '../Message';
import './styles.scss';

function ChatWindow() {
  const { selectedRoom, members, setIsVisibleInvite } = useContext(AppContext);
  const {
    user: { uid, displayName, photoURL },
  } = useContext(AuthContext);
  const [inputValue, setInputValue] = useState('');
  const [form] = Form.useForm();

  const handleInputChange = e => setInputValue(e.target.value);

  const handleSubmit = () => {
    addDocument('messages', {
      text: inputValue,
      uid,
      displayName,
      roomId: selectedRoom.id,
      photoURL,
    });
    form.resetFields(['messages']);
  };

  const condition = useMemo(
    () => ({
      fieldName: 'roomId',
      operator: '==',
      compareValue: selectedRoom?.id,
    }),
    [selectedRoom?.id]
  );
  const messageLists = useFileStore('messages', condition);
  return (
    <div className="chat-window">
      {selectedRoom?.id ? (
        <>
          <div className="chat-window-header">
            <div className="chat-window-header__info">
              <p className="chat-window-header__info--title">{selectedRoom?.name}</p>
              <span className="chat-window-header__info--description">
                {selectedRoom?.description}
              </span>
            </div>
            <div className="chat-window-header__button">
              <Button
                icon={<UserAddOutlined />}
                type="text"
                onClick={() => setIsVisibleInvite(true)}
              >
                Invite
              </Button>
              <Avatar.Group size="small" maxCount={2}>
                {members.map(member => (
                  <Tooltip title={member.displayName} key={member.id}>
                    <Avatar src={member.photoURL}>
                      {member.photoURL ? '' : member.displayName?.charAt(0).toUpperCase()}
                    </Avatar>
                  </Tooltip>
                ))}
              </Avatar.Group>
            </div>
          </div>
          <div className="chat-window-content">
            <div className="chat-window-content__message">
              {messageLists.map(message => (
                <Message
                  key={message.id}
                  text={message.text}
                  photoURL={message.photoURL}
                  displayName={message.displayName}
                  createdAt={message.createdAt}
                />
              ))}
            </div>
            <Form form={form} className="chat-window-content__form">
              <Form.Item name="messages">
                <Input
                  onChange={handleInputChange}
                  onPressEnter={handleSubmit}
                  placeholder="Enter message ..."
                  bordered={false}
                  autoComplete="off"
                />
              </Form.Item>
              <Button type="primary" onClick={handleSubmit}>
                Send
              </Button>
            </Form>
          </div>
        </>
      ) : (
        <Alert
          message="No selected room chat, please choose one room or add new room chat"
          type="info"
          showIcon
          style={{ margin: 5 }}
        />
      )}
    </div>
  );
}

export default ChatWindow;
