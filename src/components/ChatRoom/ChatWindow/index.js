import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip, Avatar, Form, Input } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

import './styles.scss';
import Message from '../Message';

function ChatWindow(props) {
  return (
    <div className="chat-window">
      <div className="chat-window-header">
        <div className="chat-window-header__info">
          <p className="chat-window-header__info--title">Room 1</p>
          <span className="chat-window-header__info--description">
            This is Room 1
          </span>
        </div>
        <div className="chat-window-header__button">
          <Button icon={<UserAddOutlined />} type="text">
            Invite
          </Button>
          <Avatar.Group size="small" maxCount={2}>
            <Tooltip title="A">
              <Avatar>A</Avatar>
            </Tooltip>
            <Tooltip title="A">
              <Avatar>A</Avatar>
            </Tooltip>
            <Tooltip title="A">
              <Avatar>A</Avatar>
            </Tooltip>
            <Tooltip title="A">
              <Avatar>A</Avatar>
            </Tooltip>
          </Avatar.Group>
        </div>
      </div>
      <div className="chat-window-content">
        <div className="chat-window-content__message">
          <Message
            text="test"
            photoURL={null}
            displayName="Quang"
            createdAt={1630461454917}
          />
          <Message
            text="test"
            photoURL={null}
            displayName="Quang"
            createdAt={1630461454917}
          />
          <Message
            text="test"
            photoURL={null}
            displayName="Quang"
            createdAt={1630461454917}
          />
          <Message
            text="test"
            photoURL={null}
            displayName="Quang"
            createdAt={1630461454917}
          />
        </div>
        <Form className="chat-window-content__form">
          <Form.Item>
            <Input
              placeholder="Enter message ..."
              bordered={false}
              autoComplete="off"
            />
          </Form.Item>
          <Button type="primary">Send</Button>
        </Form>
      </div>
    </div>
  );
}

ChatWindow.propTypes = {};

export default ChatWindow;
