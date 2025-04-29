import { useId } from 'react';
import { useShouldRender } from '../../hooks/useShouldRender';
import css from './Filters.module.css';
import Button from '../ui/Button/Button';
import { useDispatch } from 'react-redux';
import { getRecommendedBooks } from '../../redux/books/operations';
import { useForm } from 'react-hook-form';

export default function Filters() {
  const dispatch = useDispatch();

  const isRecommendedPage = useShouldRender(['/recommended']);
  const isMyLibraryPage = useShouldRender(['/library']);
  // const isMyReadingPage = useShouldRender([/^\/reading\/[^/]+$/]);

  const bookId = useId();
  const authorId = useId();
  const pagesId = useId();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: '',
      author: '',
      pages: '',
    },
  });

  const onSubmit = ({ title, author, pages }) => {
    if (!title && !author && !pages) {
      dispatch(getRecommendedBooks({}));
    } else {
      dispatch(getRecommendedBooks({ title, author, pages }));
    }
  };

  return (
    <>
      {isRecommendedPage && (
        <form className={css.filtersForm} onSubmit={handleSubmit(onSubmit)}>
          <h1 className={css.filtersTitle}>Filters:</h1>

          <div className={css.inputWrapper}>
            <label className={css.formLabel} htmlFor={bookId}>
              Book title:
            </label>
            <input
              {...register('title')}
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
              {...register('author')}
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
        <form className={css.filtersForm} onSubmit={handleSubmit(onSubmit)}>
          <h1 className={css.filtersTitle}>Create your library:</h1>

          <div className={css.inputWrapper}>
            <label className={css.formLabel} htmlFor={bookId}>
              Book title:
            </label>
            <input
              {...register('title')}
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
              {...register('author')}
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
              {...register('pages')}
              className={css.pagesInput}
              id={pagesId}
              type="text"
              placeholder="0"
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
