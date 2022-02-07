import React, { FC } from 'react';
import './Container.scss';

interface IContainerProps {
  children: React.ReactNode[] | React.ReactNode;
}

const Container: FC<IContainerProps> = ({ children }) => {
  return <div className="Container">{children}</div>;
};

export default Container;
