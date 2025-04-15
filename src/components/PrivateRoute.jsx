import { Navigate } from 'react-router-dom';
// import { useAuthSelector } from '../hooks/useAuthSelector.js';

const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  //   const { isLoggedIn } = useAuthSelector();
  //   return isLoggedIn ? Component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
