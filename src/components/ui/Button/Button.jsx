import clsx from 'clsx';
import css from './Button.module.css';

export default function Button({ children, type, variant, ...rest }) {
  return (
    <button
      type={type}
      className={clsx(
        css.button,
        (variant === 'registration' && css.registrationBtn) ||
          (variant === 'logIn' && css.logInBtn) ||
          (variant === 'apply' && css.applyBtn) ||
          (variant === 'logOut' && css.logOutBtn) ||
          (variant === 'addBook' && css.addBookBtn) ||
          (variant === 'addToLibrary' && css.addToLibraryBtn) ||
          (variant === 'start' && css.startBtn) ||
          (variant === 'stop' && css.stopBtn) ||
          (variant === 'paginationLeft' && css.paginationBtn) ||
          (variant === 'paginationRight' && css.paginationBtn) ||
          (variant === 'closeModal' && css.closeModalBtn) ||
          (variant === 'closeMobMenu' && css.closeMobMenuBtn) ||
          (variant === 'burger' && css.burgerBtn) ||
          (variant === 'deleteBook' && css.deleteBookBtn) ||
          (variant === 'deleteDairyItem' && css.deleteDairyItemBtn)
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
