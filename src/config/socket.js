import { io } from 'socket.io-client';

export const socket = io('http://localhost:5000', {
  autoConnect: false,
  auth: (cb) => {
    const persistedUser = localStorage.getItem('user');
    if (persistedUser) {
      cb({
        id: JSON.parse(persistedUser).id,
      });
    }
  },
});
