import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
// import { useAuthSelector } from '../../hooks/useAuthSelector';
import SharedLayout from '../ui/SharedLayout.jsx';
import Notification from '../ui/Notification/Notification.jsx';
import PrivateRoute from '../PrivateRoute.jsx';
import RestrictedRoute from '../RestrictedRoute.jsx';
// import { useDispatch } from 'react-redux';
// import { authOperations } from '../../redux';
import Loader from '../ui/Loader/Loader.jsx';

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
  //   const dispatch = useDispatch();
  //   const { isRefreshing, isLoading: authLoading } = useAuthSelector();

  //   useEffect(() => {
  //     dispatch(authOperations.refreshUser());
  //   }, [dispatch]);

  return (
    <>
      {/* <Notification />
      {authLoading && <Loader />}
      {isRefreshing ? (
        <Loader />
      ) : ( */}
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
              <PrivateRoute component={<MyLibraryPage />} redirectTo="/login" />
            }
          />
          <Route
            path="/reading/:bookId"
            element={
              <PrivateRoute component={<MyReadingPage />} redirectTo="/login" />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      {/* )} */}
    </>
  );
}
