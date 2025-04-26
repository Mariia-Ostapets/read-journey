import { useDispatch } from 'react-redux';
import Button from '../ui/Button/Button';
import UserNav from '../UserNav/UserNav';
import css from './MobMenu.module.css';
import { logOut } from '../../redux/auth/operations';
import { useEffect } from 'react';

export default function MobMenu({ onClose, isOpen }) {
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    dispatch(logOut());
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={css.mobMenuBackdrop} onClick={handleBackdropClick}>
      <div className={`${css.mobMenuWrapper} ${isOpen ? css.open : ''}`}>
        <Button type="button" variant="closeMobMenu" onClick={onClose}>
          <svg width={28} height={28}>
            <use href="/sprite.svg#icon-close"></use>
          </svg>
        </Button>
        <UserNav />
        <Button type="submit" variant="logOut" onClick={handleLogOut}>
          Log out
        </Button>
      </div>
    </div>
  );
}
