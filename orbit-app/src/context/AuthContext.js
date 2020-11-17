import React, { useState, createContext } from 'react';

const AuthContext = createContext();
const { Provider } = AuthContext;


const AuthProvider = ({ children }) => {
  // should be in a useeffect hook 
  // const token = localStorage.getItem('token');
  // const userInfo = localStorage.getItem('userInfo');
  // const expiresAt = localStorage.getItem('expiresAt');

  const [authState, setAuthState] = useState(() => {
    const token = localStorage.getItem('token');
    const userInfo = localStorage.getItem('userInfo');
    const expiresAt = localStorage.getItem('expiresAt');

    return {
      expiresAt,
      token,
      userInfo: userInfo ? JSON.parse(userInfo) : {}
    }
  });


  const setAuthInfo = ({ token, userInfo, expiresAt }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    localStorage.setItem('expiresAt', expiresAt);
    setAuthState({
      token,
      expiresAt,
      userInfo,
    })
  }

const isAuthenticated = () => {
  if(!authState.token || !authState.expiresAt ){
    return false;
  }
  return new Date().getItem() / 1000 < authState.expiresAt 
}

  return (
    <Provider
      value={{
        authState,
        setAuthState: authInfo => setAuthInfo(authInfo),
        isAuthenticated
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
