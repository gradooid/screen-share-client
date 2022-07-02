import { urls } from './urls';
import Home from '../pages/Home';
import Room from '../pages/Room';

export const routes = [
  {
    key: 'home',
    path: urls.home,
    component: Home,
  },
  {
    key: 'room',
    path: urls.room + '/:roomId',
    component: Room,
  },
];
