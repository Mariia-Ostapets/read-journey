import css from './SignInPage.module.css';
import { Link } from 'react-router-dom';
import { useDeviceType } from '../../hooks/index.js';
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
        </div>

        {showBgrWrapper && <div className={css.bgrWrapper}></div>}
      </div>
    </>
  );
}
