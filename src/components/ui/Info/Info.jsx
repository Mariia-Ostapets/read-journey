import { useShouldRender } from '../../../hooks/useShouldRender';
import css from './Info.module.css';

export default function Info() {
  const isRecommendedPage = useShouldRender(['/recommended']);
  const isMyLibraryPage = useShouldRender(['/library']);
  const isMyReadingPage = useShouldRender([/^\/reading\/[^/]+$/]);

  return (
    <div className={css.infoContainer}>
      {(isRecommendedPage || isMyLibraryPage) && (
        <picture>
          <source
            srcSet="/images/hand.png 1x, /images/hand@2x.png 2x"
            media="(min-width: 768px)"
            width="70"
            height="70"
          />
          <source
            srcSet="/images/hand-mob.png 1x, /images/hand-mob@2x.png 2x"
            media="(max-width: 767px)"
            width="50"
            height="50"
          />
          <img
            src="/images/hand-mob.png"
            alt="Good Job Img"
            width="50"
            height="50"
          />
        </picture>
      )}

      {isMyReadingPage && (
        <picture>
          <source
            srcSet="/images/books.png 1x, /images/books@2x.png 2x"
            media="(min-width: 768px)"
            width="70"
            height="70"
          />
          <source
            srcSet="/images/books-mob.png 1x, /images/books-mob@2x.png 2x"
            media="(max-width: 767px)"
            width="50"
            height="50"
          />
          <img
            src="/images/books-mob.png"
            alt="No Results Books Img"
            width="50"
            height="50"
          />
        </picture>
      )}

      {(isRecommendedPage || isMyLibraryPage) && (
        <div>
          <h3 className={css.infoTitle}>Good job!</h3>
          <p className={css.infoText}>
            <span className={css.infoTextAccent}>Your book is now in</span> the
            library!{' '}
            <span className={css.infoTextAccent}>
              The joy knows no bounds and now you can start your training
            </span>
          </p>
        </div>
      )}

      {isMyReadingPage && (
        <div>
          <h3 className={css.infoTitle}>The book is read</h3>
          <p className={css.infoText}>
            <span className={css.infoTextAccent}>It was an</span> exciting
            journey
            <span className={css.infoTextAccent}>
              , where each page revealed new horizons, and the characters became
              inseparable friends.
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
