import React, { FC } from 'react';
import './FolowUserBtn.scss';

interface IFolowUserBtnProps {
  username: string | undefined;
}

const FolowUserBtn: FC<IFolowUserBtnProps> = ({ username }) => {
  return (
    <div className="FolowUserBtn">
      <i className="ion-plus-round"></i>
      {` Folow ${username}`}
    </div>
  );
};

export default FolowUserBtn;
