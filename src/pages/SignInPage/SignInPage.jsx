import css from './SignInPage.module.css';
import { Link } from 'react-router-dom';
import { useDeviceType } from '../../hooks/useDeviceType.js';
import SignInForm from '../../components/SignInForm/SignInForm.jsx';
import Button from '../../components/ui/Button/Button.jsx';

export default function SignInPage() {
  const deviceType = useDeviceType();

  const showBgrWrapper = deviceType === 'mobile' || deviceType === 'desktop';

  return (
    <>
      <div className={css.signUpPageWrapper}>
        <div className={css.headerWrapper}>
          <header>
            <Link to="/login" className={css.logo}>
              <svg width={42} height={17}>
                <use href="/sprite.svg#icon-logo"></use>
              </svg>
            </Link>
          </header>
          <SignInForm />
          <Button type="submit" variant="registration">
            Registration
          </Button>
          <Button type="submit" variant="logIn">
            Log in
          </Button>
          <Button type="submit" variant="apply">
            To apply
          </Button>
          <Button type="submit" variant="logOut">
            Log out
          </Button>
          <Button type="submit" variant="addBook">
            Add book
          </Button>
          <Button type="submit" variant="addToLibrary">
            Add to library
          </Button>
          <Button type="submit" variant="start">
            To start
          </Button>
          <Button type="submit" variant="stop">
            To stop
          </Button>
          <Button type="button" variant="paginationLeft">
            <svg className={css.paginationBtnIcon}>
              <use href="/sprite.svg#icon-chevron-left"></use>
            </svg>
          </Button>
          <Button type="button" variant="paginationRight">
            <svg className={css.paginationBtnIcon}>
              <use href="/sprite.svg#icon-chevron-right"></use>
            </svg>
          </Button>
          <Button type="button" variant="closeModal">
            <svg width={22} height={22}>
              <use href="/sprite.svg#icon-close"></use>
            </svg>
          </Button>
          <Button type="button" variant="closeMobMenu">
            <svg width={28} height={28}>
              <use href="/sprite.svg#icon-close"></use>
            </svg>
          </Button>
          <Button type="button" variant="burger">
            <svg width={28} height={28}>
              <use href="/symbol-defs.svg#icon-burger"></use>
            </svg>
          </Button>
          <Button type="button" variant="deleteBook">
            <svg width={28} height={28}>
              <use href="/sprite.svg#icon-trash-block"></use>
            </svg>
          </Button>
          <Button type="button" variant="deleteDairyItem">
            <svg width={14} height={14}>
              <use href="/sprite.svg#icon-trash"></use>
            </svg>
          </Button>
        </div>

        {showBgrWrapper && <div className={css.bgrWrapper}></div>}
      </div>
    </>
  );
}
