import React, { FC } from 'react';
import Container from '../../Container/Container';
import './NotFound.css';

const NotFound: FC = () => {
  return (
    <div className={'not-found'}>
      <Container>
        <div className={'not-found__body'}>
          <img src="/assets/404.svg" alt="404 error" className={'not-found__img'} />
          <h2 className={'not-found__subtitle'}>Page not found</h2>
          <p className={'not-found__text'}>
            The site configured at this address does not contain the requested file.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default NotFound;
