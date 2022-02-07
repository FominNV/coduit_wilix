import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import './Main.scss';

const Main: FC = () => {
  return (
    <main className={'Main'}>
      <Outlet />
    </main>
  );
};

export default Main;
