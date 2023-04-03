import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = React.createContext({
  user: null,
  login: arg => {},
  logout: arg => {},
});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        login: obj => {
          const { token } = obj.token;
          if (token) {
            setUser(token);
            AsyncStorage.setItem('token', token)
            AsyncStorage.setItem('@auth', JSON.stringify(obj));
          }
        },
        logout: () => {
          setUser(null);
          AsyncStorage.removeItem('@auth');
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
