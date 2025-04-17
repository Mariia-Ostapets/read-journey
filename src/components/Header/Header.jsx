import { Link } from 'react-router-dom';
import UserNav from '../UserNav/UserNav';
import UserBar from '../UserBar/UserBar';
import css from './Header.module.css';
import { useDeviceType } from '../../hooks/useDeviceType';

export default function Header() {
  const deviceType = useDeviceType();

  return (
    <>
      <div className={css.logoWrapper}>
        <Link to="/login" className={css.logo}>
          <svg width={42} height={17}>
            <use href="/sprite.svg#icon-logo"></use>
          </svg>
        </Link>
        {deviceType === 'desktop' && (
          <Link to="/login" className={css.logoText}>
            read journey
          </Link>
        )}
      </div>
      {deviceType !== 'mobile' && <UserNav />}
      <UserBar />
    </>
  );
}
