import { createContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

import { socket } from '../config/socket';

export const UserContext = createContext(null);

export function UserContextProvider({ children }) {
  const persistedUser = localStorage.getItem('user');

  const [user, setUser] = useState(
    persistedUser ? JSON.parse(persistedUser) : null
  );

  useEffect(() => {
    const persistedUser = localStorage.getItem('user');
    if (persistedUser) {
      setUser(JSON.parse(persistedUser));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
    socket.connect();
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
