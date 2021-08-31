import React from "react";
import PropTypes from "prop-types";
import { Button, Collapse, Typography } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import "./styles.scss";

const { Panel } = Collapse;

function RoomList(props) {
  return (
    <Collapse ghost defaultActiveKey={["1"]}>
      <Panel header="Room list" key="1">
        <Typography.Link>Room 1</Typography.Link>
        <Typography.Link>Room 2</Typography.Link>
        <Typography.Link>Room 3</Typography.Link>
        <Button type="text" icon={<PlusSquareOutlined />} className="add-room">
          Add room
        </Button>
      </Panel>
    </Collapse>
  );
}

RoomList.propTypes = {};

export default RoomList;
