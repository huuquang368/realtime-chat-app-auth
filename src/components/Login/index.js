import React from 'react';
import { Row, Col, Button } from 'antd';
import Title from 'antd/lib/typography/Title';
import { signInWithPopup } from 'firebase/auth';
import { FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { getAdditionalUserInfo } from '@firebase/auth';
import { auth } from '../../firebase/config';
import { addDocument } from '../../firebase/services';

const fbProvider = new FacebookAuthProvider();
const ggProvider = new GoogleAuthProvider();

function Login() {
  const handleFBLogin = () => async () => {
    const result = await signInWithPopup(auth, fbProvider);
    const { displayName, email, photoURL, uid, providerId } = result?.user;
    const { isNewUser } = getAdditionalUserInfo(result);
    if (isNewUser) {
      addDocument('users', { displayName, email, photoURL, uid, providerId });
    }
  };

  const handleGGLogin = async () => {
    const result = await signInWithPopup(auth, ggProvider);
    const { displayName, email, photoURL, uid, providerId } = result?.user;
    const { isNewUser } = getAdditionalUserInfo(result);
    if (isNewUser) {
      addDocument('users', { displayName, email, photoURL, uid, providerId });
    }
  };

  return (
    <div>
      <Row justify="center">
        <Col span={8}>
          <Title style={{ textAlign: 'center' }} level={3}>
            Fun Chat
          </Title>
          <Button style={{ width: '100%', marginBottom: 5 }} onClick={handleGGLogin}>
            Login by Google
          </Button>
          <Button style={{ width: '100%' }} onClick={handleFBLogin}>
            Login by Facebook
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
