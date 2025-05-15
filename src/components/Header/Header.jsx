import { Link } from 'react-router-dom';
import UserNav from '../UserNav/UserNav';
import UserBar from '../UserBar/UserBar';
import css from './Header.module.css';
import Button from '../ui/Button/Button';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import { useEffect, useState } from 'react';
import MobMenu from '../MobMenu/MobMenu';
import { useDeviceType } from '../../hooks/useDeviceType';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

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

  const deviceType = useDeviceType();

  const isMobile = deviceType === 'mobile';
  const isDesktop = deviceType === 'desktop';

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className={css.headerContainer}>
      <header className={css.header}>
        <div className={css.logoWrapper}>
          <Link to="/login" className={css.logo}>
            <svg width={42} height={17}>
              <use href="/sprite.svg#icon-logo"></use>
            </svg>
          </Link>
          {isDesktop && (
            <Link to="/login" className={css.logoText}>
              read journey
            </Link>
          )}
        </div>
        <div className={css.userNavUserBarBtnWrapper}>
          {!isMobile && <UserNav />}
          <div className={css.userBarAndBtnWrapper}>
            <UserBar />
            {isMobile && (
              <Button type="submit" variant="burger" onClick={toggleMenu}>
                <svg width={28} height={28}>
                  <use href="/sprite.svg#icon-burger"></use>
                </svg>
              </Button>
            )}
            {!isMobile && (
              <Button type="submit" variant="logOut" onClick={handleLogOut}>
                Log out
              </Button>
            )}
          </div>
        </div>
      </header>
      {isMobile && isOpen && <MobMenu onClose={closeMenu} isOpen={isOpen} />}
    </div>
  );
}
