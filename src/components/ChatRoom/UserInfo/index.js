import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, Avatar } from 'antd';
import './styles.scss';
import { signOut } from '@firebase/auth';
import { AuthContext } from 'context/AuthProvider';
import { auth } from 'firebase/config';

function UserInfo(props) {
  // useEffect(() => {
  //   onSnapshot(collection(db, 'users'), snapshot => {
  //     const data = snapshot.docs.map(doc => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));
  //     console.log(`data`, data);
  //   });
  // }, []);
  const data = useContext(AuthContext);
  const {
    user: { displayName, photoURL },
  } = data;
  console.log(`data`, data);

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

UserInfo.propTypes = {};

export default UserInfo;
