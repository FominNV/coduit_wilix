import React, { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useTypedSelector } from '../../store/selectors';

interface IRequireAuthProps {
  children: JSX.Element;
}

const RequireAuth: FC<IRequireAuthProps> = ({ children }) => {
  const { user } = useTypedSelector((state) => state.user);

  const location = useLocation();

  if (!user) {
    // Отправляем пользователя на страницу логина если он не залогинен
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
