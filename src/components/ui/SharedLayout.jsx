import { shouldShowHeader } from '../../utils';
import Header from '../Header/Header';
import Container from './Container/Container';
import Loader from './Loader/Loader';
import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export default function SharedLayout() {
  const { pathname } = useLocation();

  return (
    <>
      {shouldShowHeader(pathname) && <Header />}

      <main>
        <Container>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </Container>
      </main>
    </>
  );
}
