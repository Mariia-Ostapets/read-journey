import { Link } from 'react-router-dom';
import UserNav from '../UserNav/UserNav';
import UserBar from '../UserBar/UserBar';
import css from './Header.module.css';
import { useDeviceType } from '../../hooks/useDeviceType';
import Button from '../ui/Button/Button';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/auth/operations';

export default function Header() {
  const deviceType = useDeviceType();

  const dispatch = useDispatch();

  const handleLogOut = async () => {
    dispatch(logOut());
  };

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
      <Button type="submit" variant="logOut" onClick={handleLogOut}>
        Log out
      </Button>
    </>
  );
}
