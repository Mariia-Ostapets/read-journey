import { useEffect, useState } from 'react';
import css from './SignInPage.module.css';
import { Link } from 'react-router-dom';

function shouldRenderBgrWrapper() {
  const width = window.innerWidth;
  return width <= 768 || width >= 1280;
}

export default function SignInPage() {
  const [showBgrWrapper, setShowBgrWrapper] = useState(
    shouldRenderBgrWrapper()
  );

  useEffect(() => {
    const handleResize = () => {
      setShowBgrWrapper(shouldRenderBgrWrapper());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className={css.headerWrapper}>
        <header>
          <Link to="/login" className={css.logo}>
            <svg width={42} height={17}>
              <use href="/sprite.svg#icon-logo"></use>
            </svg>
          </Link>
        </header>
      </div>

      {showBgrWrapper && <div className={css.headerBgrWrapper}></div>}
    </>
  );
}
