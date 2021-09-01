import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, Avatar } from 'antd';
import './styles.scss';
import { signOut } from '@firebase/auth';
import { auth, db } from '../../../firebase/config';
import { collection, onSnapshot } from '@firebase/firestore';

function UserInfo(props) {
  useEffect(() => {
    onSnapshot(collection(db, 'users'), snapshot => {
      const data = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(`data`, data);
    });
  }, []);

  return (
    <div className="user-info">
      <div className="user-info-title">
        <Avatar>A</Avatar>
        <Typography.Text style={{ color: 'white', marginLeft: 5 }}>user</Typography.Text>
      </div>
      <Button ghost onClick={() => signOut(auth)}>
        Log out
      </Button>
    </div>
  );
}

UserInfo.propTypes = {};

export default UserInfo;
