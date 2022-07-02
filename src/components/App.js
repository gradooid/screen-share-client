import { Routes, Route } from 'react-router-dom';

import { routes } from '../config/routes';

function App() {
  return (
    <Routes>
      {routes.map(({ component: Component, ...routeProps }) => (
        <Route {...routeProps} element={<Component />} />
      ))}
    </Routes>
  );
}

export default App;
