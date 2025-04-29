import { useShouldRender } from '../../../hooks/useShouldRender';
import css from './Container.module.css';
import clsx from 'clsx';

export default function Container({ children }) {
  const isAuthPage = useShouldRender(['/register', '/login']);

  return (
    <div
      className={clsx({
        [css.container]: !isAuthPage,
        [css.containerAuth]: isAuthPage,
      })}
    >
      {children}
    </div>
  );
}
