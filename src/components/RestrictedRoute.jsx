import { Navigate } from 'react-router-dom';
// import { useAuthSelector } from '../hooks/useAuthSelector.js';

const RestrictedRoute = ({ component: Component, redirectTo = '/' }) => {
  //   const { isLoggedIn } = useAuthSelector();
  //   return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};

export default RestrictedRoute;
