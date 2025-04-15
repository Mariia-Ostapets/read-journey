import css from './SignUpPage.module.css';
import { Link } from 'react-router-dom';
import { useDeviceType } from '../../hooks/index.js';
import SignUpForm from '../../components/SignUpForm/SignUpForm.jsx';

export default function SignUpPage() {
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
          <SignUpForm />
        </div>

        {showBgrWrapper && <div className={css.bgrWrapper}></div>}
      </div>
    </>
  );
}
