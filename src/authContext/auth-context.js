import React, { useState } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  login: () => {
  },
  logout: () => {
  }
});

export const AuthContextProvider = props => {

  const initIsLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));

  const [isLogged, setIsLogged] = useState(initIsLoggedIn);

  const userIsLoggedIn = !!isLogged;

  const loginHandler = () => {
    setIsLogged(true);
    localStorage.setItem('isLoggedIn', JSON.stringify(true));
  }

  const logoutHandler = () => {
    setIsLogged(false);
    localStorage.removeItem('isLoggedIn');
  }

  const contextValue = {
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler
  }

  return <AuthContext.Provider value={contextValue}>
    {props.children}
  </AuthContext.Provider>
};

export default AuthContext;
