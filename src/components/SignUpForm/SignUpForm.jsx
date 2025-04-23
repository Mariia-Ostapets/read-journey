import { useId, useState } from 'react';
import Button from '../ui/Button/Button';
import css from './SignUpForm.module.css';
import { useDispatch } from 'react-redux';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { register } from '../../redux/auth/operations';
import clsx from 'clsx';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .matches(
      /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      'Email must match pattern: Your@email.com'
    )
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(7, 'Enter a valid Password*'),
});

export default function SignUpForm() {
  const [isEyeOff, setIsEyeOff] = useState(true);

  const {
    register: formRegister,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const nameId = useId();
  const emailId = useId();
  const pwdId = useId();

  const name = useWatch({ control, name: 'name' });
  const email = useWatch({ control, name: 'email' });
  const password = useWatch({ control, name: 'password' });

  const dispatch = useDispatch();

  const onSubmit = async data => {
    try {
      await dispatch(register(data)).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const togglePasswordVisibility = () => setIsEyeOff(prev => !prev);

  const renderIcon = (isValid, hasError) => {
    if (isValid) {
      return (
        <svg className={clsx(css.icon, css.iconValid)}>
          <use href="/sprite.svg#icon-check" />
        </svg>
      );
    }
    if (hasError) {
      return (
        <svg className={clsx(css.icon, css.iconInvalid)}>
          <use href="/sprite.svg#icon-error" />
        </svg>
      );
    }
    return null;
  };

  const isValidName = name?.trim().length > 0 && !errors.name;
  const isValidEmail =
    /^[\w]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email) && !errors.email;
  const isValidPassword = password?.length >= 7 && !errors.password;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className={css.signTitle}>
        Expand your mind, reading{' '}
        <span className={css.signTitleAccentWord}>a book</span>
      </h1>

      <div className={css.inputWrapper}>
        <label className={css.formLabel} htmlFor={nameId}>
          Name:
        </label>
        <input
          className={clsx(css.inputName, {
            [css.inputValid]: isValidName,
            [css.inputInvalid]: errors.name,
          })}
          id={nameId}
          type="text"
          placeholder="Mariia Ostapets"
          {...formRegister('name')}
        />
        {renderIcon(isValidName, errors.name)}
      </div>
      {isValidName && <p className={css.successMessage}>Name is secure</p>}
      {errors.name && <p className={css.errorMessage}>{errors.name.message}</p>}

      <div className={css.inputWrapper}>
        <label className={css.formLabel} htmlFor={emailId}>
          Mail:
        </label>
        <input
          className={clsx(css.inputEmail, {
            [css.inputValid]: isValidEmail,
            [css.inputInvalid]: errors.email,
          })}
          id={emailId}
          type="text"
          placeholder="Your@email.com"
          {...formRegister('email')}
        />
        {renderIcon(isValidEmail, errors.email)}
      </div>
      {isValidEmail && <p className={css.successMessage}>Mail is secured</p>}
      {errors.email && (
        <p className={css.errorMessage}>{errors.email.message}</p>
      )}

      <div className={css.inputWrapper}>
        <label className={css.formLabel} htmlFor={pwdId}>
          Password:
        </label>
        <input
          className={clsx(css.inputPwd, {
            [css.inputValid]: isValidPassword,
            [css.inputInvalid]: errors.password,
          })}
          id={pwdId}
          type={isEyeOff ? 'password' : 'text'}
          placeholder="Yourpasswordhere"
          {...formRegister('password')}
        />
        <svg className={css.formIcon} onClick={togglePasswordVisibility}>
          <use href={`/sprite.svg#icon-${isEyeOff ? 'eye-off' : 'eye'}`} />
        </svg>
        {renderIcon(isValidPassword, errors.password)}
      </div>
      {isValidPassword && (
        <p className={css.successMessage}>Password is secured</p>
      )}
      {errors.password && (
        <p className={css.errorMessage}>{errors.password.message}</p>
      )}
      <Button type="submit" variant="registration">
        Registration
      </Button>
    </form>
  );
}
