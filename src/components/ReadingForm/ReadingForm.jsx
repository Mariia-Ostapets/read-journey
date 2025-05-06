import css from './ReadingForm.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { useId, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import clsx from 'clsx';
import Info from '../ui/Info/Info';
import ModalForm from '../ui/ModalForm/ModalForm';
import Button from '../ui/Button/Button';

const schema = yup.object().shape({
  pages: yup
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === '' ? undefined : Number(originalValue)
    )
    .required('Pages are required')
    .typeError('Pages must be a number')
    .positive('Must be positive')
    .integer('Must be an integer'),
});

export default function ReadingForm() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const closeSuccessModal = () => setShowSuccessModal(false);

  const pagesId = useId();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      author: '',
      pages: '',
    },
  });

  const pages = useWatch({ control, name: 'pages' });

  const dispatch = useDispatch();

  // const onSubmit = async ({ title, author, pages }) => {
  //   const newBook = {
  //     title,
  //     author,
  //     totalPages: pages,
  //   };

  //   try {
  //     await dispatch(addBook(newBook)).unwrap();
  //     setShowSuccessModal(true);
  //     reset();
  //   } catch (error) {
  //     toast.error(`Failed to add book: ${error}. Please, try again.`);
  //   }
  // };

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

  const isValidPages =
    pages !== '' &&
    !isNaN(pages) &&
    Number(pages) > 0 &&
    Number.isInteger(Number(pages)) &&
    !errors.pages;

  return (
    <>
      {/* <form className={css.addBookForm} onSubmit={handleSubmit(onSubmit)}> */}
      <form className={css.addBookForm}>
        <h1 className={css.addBookTitle}>Start page:</h1>

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
        {isValidPages && <p className={css.successMessage}>Pages are secure</p>}
        {errors.pages && (
          <p className={css.errorMessage}>{errors.pages.message}</p>
        )}

        <Button type="submit" variant="start">
          To start
        </Button>
      </form>

      {showSuccessModal && (
        <ModalForm
          modalIsOpen={showSuccessModal}
          closeModal={closeSuccessModal}
          variant="notification"
        >
          <Info />
        </ModalForm>
      )}
    </>
  );
}
