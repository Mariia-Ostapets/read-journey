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
      <div className={css.signPageWrapper}>
        <div className={css.signWrapper}>
          <header className={css.signHeader}>
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
          </header>
          <h1 className={css.signTitle}>
            Expand your mind, reading{' '}
            <span className={css.signTitleAccentWord}>a book</span>
          </h1>
          <SignInForm />
          <Button type="submit" variant="logIn">
            Log in
          </Button>
        </div>

        {showBgrWrapper && <div className={css.bgrWrapper}></div>}
      </div>
    </>
  );
}
