import { useLocation } from 'react-router-dom';

export const useShouldRender = allowedPaths => {
  const { pathname } = useLocation();

  return allowedPaths.some(path =>
    typeof path === 'string' ? path === pathname : path.test(pathname)
  );
};
