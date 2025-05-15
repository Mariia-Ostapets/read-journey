import { useId, useState } from 'react';
import css from './/AddBook.module.css';
import { useForm, useWatch } from 'react-hook-form';
import Button from '../ui/Button/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { addBook } from '../../redux/books/operations';
import toast from 'react-hot-toast';
import ModalForm from '../ui/ModalForm/ModalForm';
import Info from '../ui/Info/Info';
import clsx from 'clsx';

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  author: yup.string().required('Author is required'),
  pages: yup
    .number()
    // .transform((value, originalValue) =>
    //   String(originalValue).trim() === '' ? undefined : Number(originalValue)
    // )
    .required('Pages are required')
    .typeError('Pages must be a number')
    .positive('Must be positive')
    .integer('Must be an integer'),
});

export default function AddBook() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const closeSuccessModal = () => setShowSuccessModal(false);

  const bookId = useId();
  const authorId = useId();
  const pagesId = useId();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      author: '',
      pages: '',
    },
  });

  const title = useWatch({ control, name: 'title' });
  const author = useWatch({ control, name: 'author' });
  const pages = useWatch({ control, name: 'pages' });

  const dispatch = useDispatch();

  const onSubmit = async ({ title, author, pages }) => {
    const newBook = {
      title,
      author,
      totalPages: pages,
    };

    try {
      await dispatch(addBook(newBook)).unwrap();
      setShowSuccessModal(true);
      reset();
    } catch (error) {
      toast.error(`Failed to add book: ${error}. Please, try again.`);
    }
  };

  const renderIcon = (isValid, hasError) => {
    if (isValid) {
      return (
        <svg className={css.iconValidation}>
          <use href="/sprite.svg#icon-check" />
        </svg>
      );
    }
    if (hasError) {
      return (
        <svg className={css.iconValidation}>
          <use href="/sprite.svg#icon-error" />
        </svg>
      );
    }
    return null;
  };

  const isValidTitle = title?.trim().length > 0 && !errors.title;
  const isValidAuthor = author?.trim().length > 0 && !errors.author;
  const isValidPages =
    typeof pages === 'string' &&
    pages !== '' &&
    !isNaN(pages) &&
    Number(pages) > 0 &&
    Number.isInteger(Number(pages)) &&
    !errors.pages;

  return (
    <>
      <form className={css.addBookForm} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={css.addBookTitle}>Create your library:</h1>

        <div className={css.inputWrapper}>
          <label className={css.formLabel} htmlFor={bookId}>
            Book title:
          </label>
          <input
            {...register('title')}
            className={clsx(css.bookInput, {
              [css.inputValid]: isValidTitle,
              [css.inputInvalid]: errors.title,
            })}
            id={bookId}
            type="text"
            placeholder="Enter text"
          />{' '}
          {renderIcon(isValidTitle, errors.title)}
        </div>
        {isValidTitle && <p className={css.successMessage}>Title is valid</p>}
        {errors.title && (
          <p className={css.errorMessage}>{errors.title.message}</p>
        )}

        <div className={css.inputWrapper}>
          <label
            className={`${css.formLabel} ${css.formLabelAuthorPages}`}
            htmlFor={authorId}
          >
            The author:
          </label>
          <input
            {...register('author')}
            className={clsx(css.authorInput, {
              [css.inputValid]: isValidAuthor,
              [css.inputInvalid]: errors.author,
            })}
            id={authorId}
            type="text"
            placeholder="Enter text"
          />
          {renderIcon(isValidTitle, errors.author)}
        </div>
        {isValidAuthor && <p className={css.successMessage}>Author is valid</p>}
        {errors.author && (
          <p className={css.errorMessage}>{errors.author.message}</p>
        )}

        <div className={css.inputWrapper}>
          <label className={`${css.formLabel} ${css.formLabelAuthorPages}`}>
            Number of pages:
          </label>
          <input
            {...register('pages')}
            className={clsx(css.pagesInput, {
              [css.inputValid]: isValidPages,
              [css.inputInvalid]: errors.pages,
            })}
            id={pagesId}
            type="text"
            placeholder="0"
          />
          {renderIcon(isValidPages, errors.pages)}
        </div>
        {isValidPages && <p className={css.successMessage}>Pages are valid</p>}
        {errors.pages && (
          <p className={css.errorMessage}>{errors.pages.message}</p>
        )}

        <Button type="submit" variant="addBook">
          Add book
        </Button>
      </form>

      <ModalForm
        modalIsOpen={showSuccessModal}
        closeModal={closeSuccessModal}
        variant="notification"
      >
        {showSuccessModal && <Info />}
      </ModalForm>
    </>
  );
}
