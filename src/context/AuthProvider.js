import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { useHistory } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({ displayName, email, uid, photoURL });
        setIsLoading(false);
        history.push('/');
        return;
      }
      setIsLoading(false);
      history.push('/login');
    });
    // clean function
    return () => unsubscribe();
  }, [history]);

  return (
    <AuthContext.Provider value={{ user }}>{isLoading ? <Spin /> : children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
