import React, { FC, useEffect, useState } from 'react';
import Container from '../../Container/Container';
import { useDispatch } from 'react-redux';
import { clearUser, updateUser } from '../../../store/user/actions';
import { useNavigate } from 'react-router-dom';
import './Settings.scss';
import { useTypedSelector } from '../../../store/selectors';

const Settings: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, error } = useTypedSelector((state) => state.user);
  const [image, setImage] = useState<string>(user?.image as string);
  const [username, setUsername] = useState<string>(user?.username as string);
  const [bio, setBio] = useState<string>(user?.bio as string);
  const [email, setEmail] = useState<string>(user?.email as string);
  const [password, setPassword] = useState<string>('');

  // делаем ее асинхронной чтобы можно было перенаправить пользователя
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(updateUser(image, username, bio, email, password));
    if (!error) navigate(`/profile/${user?.username}`);
  };

  const imageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setImage(e.currentTarget.value);
  };

  const usernameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.currentTarget.value);
  };

  const bioChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setBio(e.currentTarget.value);
  };

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.currentTarget.value);
  };

  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.currentTarget.value);
  };

  const clickHandler = (): void => {
    dispatch(clearUser());
    navigate('/', { replace: true });
  };

  return (
    <div>
      <Container>
        <div className={'Settings-body'}>
          <h2 className={'Settings-header'}>Your Settings</h2>
          {error ? (
            <ul className={'Register-error-list error-list'}>
              {error.text.map((text) => {
                return (
                  <li key={Math.random()} className={'Register-error error'}>
                    {text}
                  </li>
                );
              })}
            </ul>
          ) : null}
          <form className={'Settings-form form'} onSubmit={submitHandler}>
            <input
              className={'Settings-form__input form__input input input_small'}
              name={'image'}
              type="text"
              placeholder={'URL of profile picture'}
              value={image}
              onChange={imageChangeHandler}
            />
            <input
              className={'Settings-form__input form__input input'}
              type="text"
              placeholder={'Username'}
              value={username}
              onChange={usernameChangeHandler}
            />
            <textarea
              className={'Settings-form__textarea form__textarea textarea'}
              name={'text'}
              placeholder={'Short bio about you'}
              value={bio}
              onChange={bioChangeHandler}
            />
            <input
              className={'Settings-form__input form__input input'}
              name={'description'}
              type="email"
              placeholder={'Email'}
              value={email}
              onChange={emailChangeHandler}
            />
            <input
              className={'Settings-form__input form__input input'}
              name={'password'}
              type="password"
              placeholder={'New Password'}
              value={password}
              onChange={passwordChangeHandler}
            />
            <button className={'Settings-form__submit form__submit submit'} type={'submit'}>
              Update Settings
            </button>
            <hr className={'Settings-form__line'} />
            <button
              onClick={clickHandler}
              className={'Settings-form__logout form__logout submit submit_small submit_logout'}
            >
              Or click here to logout.
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Settings;
