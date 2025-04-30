import { useShouldRender } from '../../../hooks/useShouldRender';
import css from './NoResults.module.css';

export default function NoResults() {
  const isRecommendedPage = useShouldRender(['/recommended']);
  const isMyLibraryPage = useShouldRender(['/library']);

  return (
    <div className={css.noResultsContainer}>
      <div className={css.noResultsImgWrapper}>
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
      </div>
      {isRecommendedPage && (
        <p className={css.noResultsText}>
          No results <span className={css.infoTextAccent}>for your</span> search
          query. <span className={css.infoTextAccent}>Please try again.</span>
        </p>
      )}

      {isMyLibraryPage && (
        <p className={css.noResultsText}>
          To start training, add{' '}
          <span className={css.infoTextAccent}>some of your books</span> or from
          the recommended ones
        </p>
      )}
    </div>
  );
}
