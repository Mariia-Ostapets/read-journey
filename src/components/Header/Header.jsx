import { Link } from 'react-router-dom';
import UserNav from '../UserNav/UserNav';
import UserBar from '../UserBar/UserBar';
import css from './Header.module.css';
import { useDeviceType } from '../../hooks/useDeviceType';
import Button from '../ui/Button/Button';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import Container from '../ui/Container/Container';
import { useState } from 'react';
import MobMenu from '../MobMenu/MobMenu';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const deviceType = useDeviceType();

  const dispatch = useDispatch();

  const handleLogOut = async () => {
    dispatch(logOut());
  };

  const toggleMenu = () => {
    setIsOpen(prevState => !prevState);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <Container>
      <header className={css.header}>
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
        <div className={css.userNavUserBarBtnWrapper}>
          {deviceType !== 'mobile' && <UserNav />}
          <div className={css.userBarAndBtnWrapper}>
            <UserBar />
            {deviceType === 'mobile' && (
              <Button type="submit" variant="burger" onClick={toggleMenu}>
                <svg width={28} height={28}>
                  <use href="/sprite.svg#icon-burger"></use>
                </svg>
              </Button>
            )}
            {deviceType !== 'mobile' && (
              <Button type="submit" variant="logOut" onClick={handleLogOut}>
                Log out
              </Button>
            )}
          </div>
        </div>
      </header>
      {deviceType === 'mobile' && isOpen && (
        <MobMenu onClose={closeMenu} isOpen={isOpen} />
      )}
    </Container>
  );
}
