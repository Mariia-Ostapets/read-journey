import css from './NoResults.module.css';

export default function NoResults() {
  return (
    <div className={css.noResultsContainer}>
      <div className={css.noResultsImgWrapper}>
        <picture className={css.noResultsImg}>
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
      <p className={css.noResultsText}>
        No results <span className={css.noResultsTextAccent}>for your</span>{' '}
        search query.{' '}
        <span className={css.noResultsTextAccent}>Please try again.</span>
      </p>
    </div>
  );
}
