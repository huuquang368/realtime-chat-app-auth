import React from 'react';
import { Col, Row } from 'antd';
import UserInfo from '../UserInfo';
import RoomList from '../RoomList';
import './styles.scss';

function Sidebar() {
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

export default Sidebar;
