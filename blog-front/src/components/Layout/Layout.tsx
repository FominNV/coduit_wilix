import React, { FC } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Layout.scss';
import Main from '../Main/Main';

const Layout: FC = () => {
  return (
    <div className={'Layout'}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default Layout;
