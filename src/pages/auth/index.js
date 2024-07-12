import React, { useContext, useState, createContext, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
 
const AuthContext = createContext(null);
 
export const AuthGuard = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('userDetails');
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error('Error parsing user details from localStorage:', error);
      return null;
    }
  });
 
 
  const [token, setToken] = useState(() => {
    return localStorage.getItem('jwtToken') || null;
  });
 
  useEffect(() => {
    const storedUser = localStorage.getItem('userDetails');
    const storedToken = localStorage.getItem('jwtToken');
   
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user details from localStorage:', error);
        console.log('Stored user details:', storedUser);
        setUser(null); // Set user to null if parsing fails
      }
    } else {
      console.warn('User details not found in localStorage');
      // Handle the case where user details are not found in localStorage
    }
 
    if (storedToken) {
      setToken(storedToken);
    } else {
      console.warn('JWT token not found in localStorage');
      // Handle the case where JWT token is not found in localStorage
    }
  }, []);
 
 
 
  const login = (user, token) => {
    console.log(token, user)
    localStorage.setItem('userDetails', JSON.stringify(user));
    localStorage.setItem('jwtToken', token);
    setUser(user);
    setToken(token);
  };
 
  const logout = () => {
    localStorage.removeItem('userDetails');
    localStorage.removeItem('jwtToken');
    setUser(null);
    setToken(null);
  };
 
  const contextValue = useMemo(() => ({
    user,
    token,
    login,
    logout,
  }), [user, token]);
 
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
 
AuthGuard.propTypes = {
  children: PropTypes.node.isRequired,
};
 
export const useAuth = () => {
  return useContext(AuthContext);
};