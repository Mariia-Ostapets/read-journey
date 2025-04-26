import css from './UserNav.module.css';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

export default function UserNav() {
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <nav className={css.userNavWrapper}>
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
  );
}
