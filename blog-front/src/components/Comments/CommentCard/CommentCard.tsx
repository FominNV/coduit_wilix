import React, { FC, ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../store/selectors';
import { deleteComment, setButtonFetchMode } from '../../../store/article/actions';
import { FETCH_MODE } from '../../../store/article/types';

import ArticleDate from '../../Articles/ArticleDate/ArticleDate';
import ArticleIcon from '../../Articles/ArticleIcon/ArticleIcon';
import ArticleUsername from '../../Articles/ArticleUsername/ArticleUsername';

import './CommentCard.scss';

interface ICommentCardProps {
  text: string;
  username: string;
  date: string;
  slug: string;
  id: string;
}

const CommentCard: FC<ICommentCardProps> = ({ text, username, date, slug, id }) => {
  // states from store
  const { user } = useTypedSelector((state) => state.user);
  const { buttonFetchMode } = useTypedSelector((state) => state.article);

  const dispatch = useDispatch();

  // delete comment
  const removeComment = (e: React.MouseEvent<HTMLButtonElement>): void => {
    dispatch(setButtonFetchMode(FETCH_MODE.FETCHING));
    dispatch(deleteComment(slug, id));
  };

  return (
    <div className="CommentCard">
      {/* comment's body */}
      <div className="CommentCard-content">{text}</div>

      {/* user's dates  start*/}
      <div className="CommentCard-panel">
        <div className="CommentCard-panel__block">
          <div className="CommentCard-panel__block_item">
            <ArticleIcon username={username} size={'small'} />
          </div>

          <div className="CommentCard-panel__block_item">
            <ArticleUsername username={username} size={'small'} />
          </div>

          <div className="CommentCard-panel__block_item">
            <ArticleDate date={date} />
          </div>
        </div>
        {/* user's dates  end*/}

        {/* show or hide button if current user is a writer of this comment */}
        {user && user.username === username && (
          <button
            className="CommentCard-panel__btn"
            onClick={removeComment}
            disabled={buttonFetchMode === FETCH_MODE.FETCHING ? true : false}
          >
            <i className="ion-trash-a"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
