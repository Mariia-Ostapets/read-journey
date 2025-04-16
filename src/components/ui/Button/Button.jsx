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
          (variant === 'pagination' && css.paginationBtn) ||
          (variant === 'closeModalAndMobMenu' && css.closeModalAndMobMenuBtn) ||
          (variant === 'burger' && css.burgerBtn) ||
          (variant === 'deleteBook' && css.deleteBook) ||
          (variant === 'deleteDairyItem' && css.deleteDairyItem)
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
