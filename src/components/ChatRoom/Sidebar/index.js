import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "antd";
import UserInfo from "../UserInfo";
import RoomList from "../RoomList";
import "./styles.scss";

function Sidebar(props) {
  return (
    <div className="sidebar">
      <Row>
        <Col span={24}>
          <UserInfo />
        </Col>
        <Col span={24}>
          <RoomList />
        </Col>
      </Row>
    </div>
  );
}

Sidebar.propTypes = {};

export default Sidebar;
