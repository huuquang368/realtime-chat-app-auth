import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
import { Button, Tooltip, Avatar, Form, Input } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

import './styles.scss';
import Message from '../Message';
import { AppContext } from 'context/AppProvider';

function ChatWindow() {
  const { selectedRoom, members } = useContext(AppContext);
  return (
    <div className="chat-window">
      <div className="chat-window-header">
        <div className="chat-window-header__info">
          <p className="chat-window-header__info--title">{selectedRoom?.name}</p>
          <span className="chat-window-header__info--description">{selectedRoom?.description}</span>
        </div>
        <div className="chat-window-header__button">
          <Button icon={<UserAddOutlined />} type="text">
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
          <Message text="test" photoURL={null} displayName="Quang" createdAt={1630461454917} />
          <Message text="test" photoURL={null} displayName="Quang" createdAt={1630461454917} />
          <Message text="test" photoURL={null} displayName="Quang" createdAt={1630461454917} />
          <Message text="test" photoURL={null} displayName="Quang" createdAt={1630461454917} />
        </div>
        <Form className="chat-window-content__form">
          <Form.Item>
            <Input placeholder="Enter message ..." bordered={false} autoComplete="off" />
          </Form.Item>
          <Button type="primary">Send</Button>
        </Form>
      </div>
    </div>
  );
}

ChatWindow.propTypes = {};

export default ChatWindow;
