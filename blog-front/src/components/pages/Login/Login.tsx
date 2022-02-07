import React, { FC, useEffect, useState } from 'react';
import Container from '../../Container/Container';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.scss';
import { useDispatch } from 'react-redux';
import { clearUser, setUser } from '../../../store/user/actions';
import { useTypedSelector } from '../../../store/selectors';

interface CustomizedState {
  from: string;
}

const Login: FC = () => {
  const dispatch = useDispatch();

  // обработка редиректа на прошлую страницу или главную
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as CustomizedState;
  const from = state?.from || '/';

  const { user, error } = useTypedSelector((state) => state.user);

  // управление формой
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(false);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(setUser(email, password));
  };

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.currentTarget.value);
  };

  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.currentTarget.value);
  };

  const getClassname = (disabled: boolean): string => {
    return disabled
      ? 'Login-form__submit form__submit submit submit_disabled'
      : 'Login-form__submit form__submit submit';
  };

  // Убираем ошибки, если перешли с регистрации
  useEffect(() => {
    dispatch(clearUser());
  }, []);

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user]);

  useEffect(() => {
    if (email && password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  return (
    <div className={'Login'}>
      <Container>
        <div className={'Login-body'}>
          <h2 className={'Login-header'}>Sign in</h2>
          <Link className={'Login-register-link'} to={'/register'}>
            Need an account?
          </Link>
          {error ? (
            <ul className={'Login-error-list error-list'}>
              {error.text.map((text) => {
                return (
                  <li key={Math.random()} className={'Login-error error'}>
                    {text}
                  </li>
                );
              })}
            </ul>
          ) : null}
          <form className={'Login-form form'} onSubmit={submitHandler}>
            <input
              className={'Login-form__input form__input input'}
              name={'email'}
              type="email"
              placeholder={'Email'}
              value={email}
              onChange={emailChangeHandler}
            />
            <input
              className={'Login-form__input form__input input'}
              name={'password'}
              type="password"
              placeholder={'Password'}
              value={password}
              onChange={passwordChangeHandler}
            />
            <button className={getClassname(disabled)} type={'submit'} disabled={disabled}>
              Sign in
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Login;
