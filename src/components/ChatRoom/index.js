import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import ChatWindow from "./ChatWindow";
import Sidebar from "./Sidebar";

function ChatRoom(props) {
  return (
    <div>
      <Row>
        <Col span={6}>
          <Sidebar />
        </Col>
        <Col span={18}>
          <ChatWindow />
        </Col>
      </Row>
    </div>
  );
}

ChatRoom.propTypes = {};

export default ChatRoom;
