import { useShouldRender } from '../../../hooks/useShouldRender';
import css from './NoResults.module.css';
import clsx from 'clsx';

export default function NoResults() {
  const isRecommendedPage = useShouldRender(['/recommended']);
  const isMyLibraryPage = useShouldRender(['/library']);
  const isMyReadingPage = useShouldRender([/^\/reading\/[^/]+$/]);

  return (
    <div
      className={clsx(
        css.noResultsContainer,
        isRecommendedPage && css.noResultsContainerRecommendedPage,
        isMyLibraryPage && css.noResultsContainerLibraryPage,
        isMyReadingPage && css.noResultsContainerReadingPage
      )}
    >
      {isMyReadingPage && (
        <p
          className={clsx(
            css.noResultsText,
            isRecommendedPage && css.noResultsTextRecommendedPage,
            isMyLibraryPage && css.noResultsTextLibraryPage,
            isMyReadingPage && css.noResultsTextReadingPage
          )}
        >
          Here you will see when and how much you read. To record, click on the
          red button above.
        </p>
      )}

      <div
        className={clsx(
          css.noResultsImgWrapper,
          isMyReadingPage && css.noResultsImgWrapperReadingPage
        )}
      >
        {(isRecommendedPage || isMyLibraryPage) && (
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

        {isMyReadingPage && (
          <picture>
            <source
              srcSet="/images/star.png 1x, /images/star@2x.png 2x"
              media="(min-width: 768px)"
              width="50"
              height="70"
            />
            <source
              srcSet="/images/star-mob.png 1x, /images/star-mob@2x.png 2x"
              media="(max-width: 767px)"
              width="32"
              height="32"
            />
            <img
              src="/images/star-mob.png"
              alt="Empty progress Img"
              width="32"
              height="32"
            />
          </picture>
        )}
      </div>

      {isRecommendedPage && (
        <p
          className={clsx(
            css.noResultsText,
            isRecommendedPage && css.noResultsTextRecommendedPage,
            isMyLibraryPage && css.noResultsTextLibraryPage,
            isMyReadingPage && css.noResultsTextReadingPage
          )}
        >
          No results <span className={css.infoTextAccent}>for your</span> search
          query. <span className={css.infoTextAccent}>Please try again.</span>
        </p>
      )}

      {isMyLibraryPage && (
        <p
          className={clsx(
            css.noResultsText,
            isRecommendedPage && css.noResultsTextRecommendedPage,
            isMyLibraryPage && css.noResultsTextLibraryPage,
            isMyReadingPage && css.noResultsTextReadingPage
          )}
        >
          To start training, add{' '}
          <span className={css.infoTextAccent}>some of your books</span> or from
          the recommended ones
        </p>
      )}
    </div>
  );
}
