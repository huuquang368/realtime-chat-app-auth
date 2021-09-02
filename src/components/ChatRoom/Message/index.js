import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Typography } from 'antd';
import { formatDate } from 'helpers/formatDate';
import './styles.scss';

function Message({ text, displayName, createdAt, photoURL }) {
  return (
    <div className="message">
      <div className="message-info">
        <Avatar size="small" src={photoURL} className="message-info__avatar">
          {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography.Text className="message-info__author">{displayName}</Typography.Text>
        <Typography.Text className="message-info__date">
          {formatDate(createdAt?.seconds)}
        </Typography.Text>
      </div>
      <div>
        <Typography.Text className="message-content">{text}</Typography.Text>
      </div>
    </div>
  );
}

Message.propTypes = {
  text: PropTypes.string,
  displayName: PropTypes.string,
  createdAt: PropTypes.object,
  photoURL: PropTypes.string,
};

export default Message;
