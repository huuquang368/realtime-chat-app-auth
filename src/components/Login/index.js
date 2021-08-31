import React from "react";
import { Row, Col, Button } from "antd";
import Title from "antd/lib/typography/Title";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useHistory } from "react-router-dom";

const fbProvider = new FacebookAuthProvider();
const ggProvider = new GoogleAuthProvider();

function Login() {
  const history = useHistory();

  const handleFBLogin = () => signInWithPopup(auth, fbProvider);
  const handleGGLogin = () => {
    signInWithPopup(auth, ggProvider).then((result) => {
      const user = result.user;
      if (user) {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        console.log(user, token);
      }
    });
  };
  onAuthStateChanged(auth, (user) => {
    if (user) {
      history.push("/");
      console.log(user.accessToken);
    }
  });

  return (
    <div>
      <Row justify="center">
        <Col span={8}>
          <Title style={{ textAlign: "center" }} level={3}>
            Fun Chat
          </Title>
          <Button
            style={{ width: "100%", marginBottom: 5 }}
            onClick={handleGGLogin}
          >
            Login by Google
          </Button>
          <Button style={{ width: "100%" }} onClick={handleFBLogin}>
            Login by Facebook
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
