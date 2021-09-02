import React, { useContext } from 'react';
import { Button, Typography, Avatar } from 'antd';
import { signOut } from '@firebase/auth';
import { AuthContext } from 'context/AuthProvider';
import { auth } from 'firebase/config';
import './styles.scss';

function UserInfo() {
  const data = useContext(AuthContext);
  const {
    user: { displayName, photoURL },
  } = data;

  return (
    <div className="user-info">
      <div className="user-info-title">
        <Avatar src={photoURL}>{photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}</Avatar>
        <Typography.Text style={{ color: 'white', marginLeft: 5 }}>{displayName}</Typography.Text>
      </div>
      <Button ghost onClick={() => signOut(auth)}>
        Log out
      </Button>
    </div>
  );
}

export default UserInfo;
