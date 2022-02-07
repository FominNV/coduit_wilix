import React, { FC } from 'react';
import './FormTag.scss';

interface IFormTag {
  tag: string;
  deleteTag: (tag: string) => void;
}

const FormTag: FC<IFormTag> = ({ tag, deleteTag }) => {
  return (
    <li className="FormTag">
      <div className="FormTag-btn" onClick={() => deleteTag(tag)}>
        <i className="ion-close-round"></i>
      </div>
      <div className="FormTag-text">{tag}</div>
    </li>
  );
};

export default FormTag;
