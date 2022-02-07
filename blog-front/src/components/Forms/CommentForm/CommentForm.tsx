import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../store/selectors';
import { addComment, setFormFetchMode } from '../../../store/article/actions';
import { FETCH_MODE } from '../../../store/article/types';

import { URLS } from '../../../utils/urls/urls';
import FormError from '../../Errors/FormError/FormError';
import './CommentForm.scss';

interface ICommentFormProps {
  slug: string;
}

const CommentForm: FC<ICommentFormProps> = ({ slug }) => {
  // states from store
  const { formFetchMode } = useTypedSelector((state) => state.article);
  const { user } = useTypedSelector((state) => state.user);

  // form states
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const dispatch = useDispatch();

  // save body if has changeg this one
  const changeHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setBody(e.currentTarget.value);
  };

  // chek form and submit
  const submitForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!body.trim()) {
      return setErrorMessage("body can't be blank");
    }
    setErrorMessage('');
    setBody('');
    dispatch(setFormFetchMode(FETCH_MODE.FETCHING));
    dispatch(addComment(slug, body));
  };

  return (
    <>
      <div className="CommentForm">
        {/* show/hide login and register links if no unauthorise*/}
        {!user ? (
          <p className="CommentForm-unauthorise">
            <Link to={'/login'} className="CommentForm-unauthorise__link">
              Sign in
            </Link>{' '}
            or{' '}
            <Link to={'/register'} className="CommentForm-unauthorise__link">
              sign up
            </Link>{' '}
            to add comments on this article
          </p>
        ) : (
          <>
            {/* form block start */}
            <div className="CommentForm-error__block">
              {errorMessage && <FormError text={errorMessage} />}
            </div>

            <form className="CommentForm-form">
              <textarea
                className="CommentForm-body"
                name="body"
                placeholder="Write a comment..."
                value={body}
                onChange={changeHandler}
                disabled={formFetchMode === FETCH_MODE.FETCHING ? true : false}
              ></textarea>

              <div className="CommentForm-panel">
                <img className="CommentForm-panel__icon" src={URLS.DEFAULT_LOGO} alt="smile" />

                {/* show/hide delete button if the user is a writer of this comment */}
                {user && (
                  <button
                    className="CommentForm-panel__btn"
                    onClick={submitForm}
                    disabled={formFetchMode === FETCH_MODE.FETCHING ? true : false}
                  >
                    Post Comment
                  </button>
                )}
              </div>
            </form>
            {/* form block end */}
          </>
        )}
      </div>
    </>
  );
};

export default CommentForm;
