import { useShouldRender } from '../../hooks/useShouldRender';
import Header from '../Header/Header';
import Container from './Container/Container';
import Loader from './Loader/Loader';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export default function SharedLayout() {
  const shouldShowHeader = useShouldRender([
    '/recommended',
    '/library',
    /^\/reading\/[^/]+$/,
  ]);

  return (
    <>
      {shouldShowHeader && <Header />}

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
