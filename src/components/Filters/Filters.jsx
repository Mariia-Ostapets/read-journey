import { useEffect, useId } from 'react';
import css from './Filters.module.css';
import Button from '../ui/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getRecommendedBooks } from '../../redux/books/operations';
import { useForm } from 'react-hook-form';
import {
  selectAuthorFilter,
  selectTitleFilter,
} from '../../redux/filters/selectors';
import { setFilters } from '../../redux/filters/slice';

export default function Filters() {
  const dispatch = useDispatch();

  const bookId = useId();
  const authorId = useId();

  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: titleFilter,
      author: authorFilter,
      pages: '',
    },
  });

  useEffect(() => {
    reset({
      title: titleFilter,
      author: authorFilter,
      pages: '',
    });
  }, [titleFilter, authorFilter, reset]);

  const onSubmit = ({ title, author, pages }) => {
    dispatch(setFilters({ title, author }));
    dispatch(getRecommendedBooks({ title, author, pages }));
  };

  return (
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
        <label
          className={`${css.formLabel} ${css.formLabelAuthor}`}
          htmlFor={authorId}
        >
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
  );
}
