import css from './UserNav.module.css';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

export default function UserNav() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <>
      {isLoggedIn && (
        <nav nav className={css.userNavWrapper}>
          <ul className={css.navList}>
            <li>
              <NavLink className={buildLinkClass} to="/recommended">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className={buildLinkClass} to="/library">
                My Library
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
