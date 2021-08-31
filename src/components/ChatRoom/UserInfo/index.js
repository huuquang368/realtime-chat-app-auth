import React from "react";
import PropTypes from "prop-types";
import { Button, Typography, Avatar } from "antd";
import "./styles.scss";

function UserInfo(props) {
  return (
    <div className="user-info">
      <div>
        <Avatar>A</Avatar>
        <Typography.Text style={{ color: "white", marginLeft: 5 }}>
          user
        </Typography.Text>
      </div>
      <Button ghost>Log out</Button>
    </div>
  );
}

UserInfo.propTypes = {};

export default UserInfo;
