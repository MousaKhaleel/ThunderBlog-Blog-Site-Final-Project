import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/profile`, {
          credentials: 'include',
          method: 'GET'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const info = await response.json();
        setUserId(info.id);
        setUserName(info.name);
        setUserEmail(info.email);
        setUserPassword(info.password);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <UserContext.Provider value={{ userId, setUserId, userName, setUserName, userEmail, setUserEmail, userPassword, setUserPassword }}>
      {children}
    </UserContext.Provider>
  );
};
