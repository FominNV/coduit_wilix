import React, { FC, ReactElement } from 'react';
import './FormError.scss';

interface IFormErrorProps {
  text: string | null;
}

const FormError: FC<IFormErrorProps> = ({ text }) => {
  return <li className="FormError">{text}</li>;
};

export default FormError;
