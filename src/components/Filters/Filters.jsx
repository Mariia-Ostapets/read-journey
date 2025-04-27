import { useId } from 'react';
import { useShouldRender } from '../../hooks/useShouldRender';
import css from './Filters.module.css';
import Button from '../ui/Button/Button';

export default function Filters() {
  const isRecommendedPage = useShouldRender(['/recommended']);
  const isMyLibraryPage = useShouldRender(['/library']);
  // const isMyReadingPage = useShouldRender([/^\/reading\/[^/]+$/]);

  const bookId = useId();
  const authorId = useId();
  const pagesId = useId();

  return (
    <>
      {isRecommendedPage && (
        <form className={css.filtersForm}>
          <h1 className={css.filtersTitle}>Filters:</h1>

          <div className={css.inputWrapper}>
            <label className={css.formLabel} htmlFor={bookId}>
              Book title:
            </label>
            <input
              className={css.bookInput}
              id={bookId}
              type="text"
              placeholder="Enter text"
            />
          </div>

          <div className={css.inputWrapper}>
            <label className={css.formLabel} htmlFor={authorId}>
              The author:
            </label>
            <input
              className={css.authorInput}
              id={authorId}
              type="text"
              placeholder="Enter text"
            />
          </div>

          <Button type="submit" variant="apply">
            To apply
          </Button>
        </form>
      )}

      {isMyLibraryPage && (
        <form className={css.filtersForm}>
          <h1 className={css.filtersTitle}>Create your library:</h1>

          <div className={css.inputWrapper}>
            <label className={css.formLabel} htmlFor={bookId}>
              Book title:
            </label>
            <input
              className={css.bookInput}
              id={bookId}
              type="text"
              placeholder="Enter text"
            />
          </div>

          <div className={css.inputWrapper}>
            <label className={css.formLabel} htmlFor={authorId}>
              The author:
            </label>
            <input
              className={css.authorInput}
              id={authorId}
              type="text"
              placeholder="Enter text"
            />
          </div>

          <div className={css.inputWrapper}>
            <label className={css.formLabel} htmlFor={pagesId}>
              Number of pages:
            </label>
            <input
              className={css.pagesInput}
              id={pagesId}
              type="text"
              placeholder="Enter text"
            />
          </div>

          <Button type="submit" variant="addBook">
            Add book
          </Button>
        </form>
      )}
    </>
  );
}
