import { lazy, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SharedLayout from '../ui/SharedLayout.jsx';
import Notification from '../ui/Notification/Notification.jsx';
import PrivateRoute from '../PrivateRoute.jsx';
import RestrictedRoute from '../RestrictedRoute.jsx';
import Loader from '../ui/Loader/Loader.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsLoading,
  selectIsRefreshing,
} from '../../redux/auth/selectors.js';
import { getCurrentUser } from '../../redux/auth/operations.js';
import toast from 'react-hot-toast';

const SignUpPage = lazy(() => import('../../pages/SignUpPage/SignUpPage'));
const SignInPage = lazy(() => import('../../pages/SignInPage/SignInPage'));
const RecommendedPage = lazy(() =>
  import('../../pages/RecommendedPage/RecommendedPage')
);
const MyLibraryPage = lazy(() =>
  import('../../pages/MyLibraryPage/MyLibraryPage')
);
const MyReadingPage = lazy(() =>
  import('../../pages/MyReadingPage/MyReadingPage')
);

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Notification />
      {isLoading && <Loader />}
      {isRefreshing ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Navigate replace to="/login" />} />
            <Route
              path="/register"
              element={
                <RestrictedRoute
                  component={<SignUpPage />}
                  redirectTo="/recommended"
                />
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute
                  component={<SignInPage />}
                  redirectTo="/recommended"
                />
              }
            />
            <Route
              path="/recommended"
              element={
                <PrivateRoute
                  component={<RecommendedPage />}
                  redirectTo="/login"
                />
              }
            />
            <Route
              path="/library"
              element={
                <PrivateRoute
                  component={<MyLibraryPage />}
                  redirectTo="/login"
                />
              }
            />
            <Route
              path="/reading/:bookId"
              element={
                <PrivateRoute
                  component={<MyReadingPage />}
                  redirectTo="/login"
                />
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </>
  );
}
