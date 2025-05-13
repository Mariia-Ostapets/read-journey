import css from './ReadingForm.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { useId, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import clsx from 'clsx';
import Info from '../ui/Info/Info';
import ModalForm from '../ui/ModalForm/ModalForm';
import Button from '../ui/Button/Button';
import { selectReadingBook } from '../../redux/books/selectors';
import { getBookStatus } from '../../utils';
import toast from 'react-hot-toast';
import { startReading, stopReading } from '../../redux/books/operations';
import { useParams } from 'react-router-dom';

const schema = yup.object().shape({
  page: yup
    .number()
    .typeError('Pages must be a number')
    .required('Pages are required')
    .positive('Must be positive')
    .integer('Must be an integer'),
});

export default function ReadingForm() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const closeSuccessModal = () => setShowSuccessModal(false);

  const pageId = useId();

  const { totalPages } = useSelector(selectReadingBook);

  const { bookId } = useParams();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      page: '',
    },
  });

  const page = useWatch({ control, name: 'page' });

  const dispatch = useDispatch();

  const onSubmitStart = async ({ page }) => {
    if (+page > totalPages) {
      toast.error(
        `Page number cannot exceed the total pages (${totalPages}) of the book.`
      );
      return;
    }

    try {
      await dispatch(startReading({ page, id: bookId })).unwrap();
      reset();
    } catch (error) {
      toast.error(`Failed to start reading: ${error}.`);
    }
  };

  const onSubmitStop = async ({ page }) => {
    if (+page > totalPages) {
      toast.error(
        `Page number cannot exceed the total pages (${totalPages}) of the book.`
      );
      return;
    }

    try {
      await dispatch(stopReading({ page, id: bookId })).unwrap();
      reset();
      if (+page === totalPages) {
        reset();
        setShowSuccessModal(true);
      }
    } catch (error) {
      toast.error(`Failed to stop reading: ${error}. Please, try again.`);
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

  const isValidPage =
    page !== '' &&
    !isNaN(page) &&
    Number(page) > 0 &&
    Number.isInteger(Number(page)) &&
    !errors.page;

  const book = useSelector(selectReadingBook);
  const bookStatus = getBookStatus(book);

  return (
    <>
      {bookStatus.status === 'active' ? (
        <form className={css.addBookForm} onSubmit={handleSubmit(onSubmitStop)}>
          <h1 className={css.addBookTitle}>Stop page:</h1>

          <div className={css.inputWrapper}>
            <label className={`${css.formLabel} ${css.formLabelAuthorPages}`}>
              Page number:
            </label>
            <input
              {...register('page')}
              className={clsx(css.pagesInput, {
                [css.inputValid]: isValidPage,
                [css.inputInvalid]: errors.page,
              })}
              id={pageId}
              type="text"
              placeholder="0"
            />
            {renderIcon(isValidPage, errors.page)}
          </div>
          {isValidPage && <p className={css.successMessage}>Pages are valid</p>}
          {errors.page && (
            <p className={css.errorMessage}>{errors.page.message}</p>
          )}

          <Button type="submit" variant="start">
            To stop
          </Button>
        </form>
      ) : (
        <form
          className={css.addBookForm}
          onSubmit={handleSubmit(onSubmitStart)}
        >
          <h1 className={css.addBookTitle}>Start page:</h1>

          <div className={css.inputWrapper}>
            <label className={`${css.formLabel} ${css.formLabelAuthorPages}`}>
              Page number:
            </label>
            <input
              {...register('page')}
              className={clsx(css.pagesInput, {
                [css.inputValid]: isValidPage,
                [css.inputInvalid]: errors.page,
              })}
              id={pageId}
              type="text"
              placeholder="0"
            />
            {renderIcon(isValidPage, errors.page)}
          </div>
          {isValidPage && <p className={css.successMessage}>Pages are valid</p>}
          {errors.page && (
            <p className={css.errorMessage}>{errors.page.message}</p>
          )}

          <Button type="submit" variant="start">
            To start
          </Button>
        </form>
      )}

      <ModalForm
        modalIsOpen={showSuccessModal}
        closeModal={closeSuccessModal}
        variant="notification"
      >
        <Info />
      </ModalForm>
    </>
  );
}
