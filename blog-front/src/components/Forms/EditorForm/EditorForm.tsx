import React, { FC, ReactChild, ReactChildren, ReactElement, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../store/selectors';
import {
  addArticle,
  setEditorMode,
  setFormFetchMode,
  setNewArticle,
  updateArticle,
} from '../../../store/article/actions';
import { EDITOR_MODE, FETCH_MODE, IArticle } from '../../../store/article/types';

import FormError from '../../Errors/FormError/FormError';
import FormTag from '../../Tags/FormTag/FormTag';

import './EditorForm.scss';

const EditorForm: FC = () => {
  // states from store
  const { articles, editArticle, editorMode, formFetchMode } = useTypedSelector(
    (state) => state.article
  );

  const dispatch = useDispatch();

  // form fields
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [tagList, setTagList] = useState<string[]>([]);

  // tag form
  const [tag, setTag] = useState<string>('');

  // error form
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // fill the form fields if editor mode (EDIT_MODE) has been activated
  useEffect(() => {
    if (editorMode === EDITOR_MODE.EDIT_MODE && editArticle) {
      setTitle(editArticle.title);
      setDescription(editArticle.description);
      setBody(editArticle.body);
      setTagList(editArticle.tagList);
    }
  }, []);

  // update article (EDIT_MODE)
  const saveChanges = (): void => {
    if (editorMode === EDITOR_MODE.EDIT_MODE && editArticle) {
      setErrorMessage(null);
      dispatch(setEditorMode(EDITOR_MODE.CREATE_MODE));
      dispatch(setFormFetchMode(FETCH_MODE.FETCHING));
      dispatch(setNewArticle(title));
      dispatch(updateArticle({ title, description, body, tagList }, editArticle.slug));
    }
  };

  // add new Article {CREATE_MODE}
  const createArticle = (): void => {
    setErrorMessage('');
    dispatch(setFormFetchMode(FETCH_MODE.FETCHING));
    dispatch(setNewArticle(title));
    dispatch(addArticle({ title, description, body, tagList }));
  };

  // save form fileds if has changed  these ones
  const changeFormHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const formElement: HTMLInputElement | HTMLTextAreaElement = event.target;

    switch (formElement.name) {
      case 'title':
        return setTitle(formElement.value);
      case 'description':
        return setDescription(formElement.value);
      case 'body':
        return setBody(formElement.value);
      case 'tag':
        return setTag(formElement.value);
    }
  };

  // check form fields
  const submitForm = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    return !title.trim() // check title
      ? setErrorMessage("title can't be blank") // throw error
      : !description.trim() // check description
      ? setErrorMessage("description can't be blank") // throw error
      : !body.trim() // check body
      ? setErrorMessage("body can't be blank") // throw error
      : editorMode === EDITOR_MODE.EDIT_MODE // if the edit mode, save changes or create article
      ? saveChanges() // update article
      : !checkTitleUnique(title) // if the create mode check for uniqueness
      ? setErrorMessage('title must be unique') // throw error
      : createArticle(); // add article
  };

  // check title for uniqueness
  const checkTitleUnique = (title: string): boolean => {
    const twin = articles!.filter(
      (el: IArticle) => el.title.toLowerCase() === title.trim().toLowerCase()
    );
    return !twin.length;
  };

  // delete tag from tag-list
  const deleteTag = (tag: string): void => {
    const filteredTagList = tagList.filter((elem: string) => elem !== tag);
    setTagList(filteredTagList);
  };

  // show tags in the form
  const showTagList = () => {
    if (tagList) {
      return tagList.map((elem: string, i: number) => (
        <FormTag deleteTag={deleteTag} tag={elem} key={i} />
      ));
    }
  };

  // add tag to tag-list
  const addTag = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.code === 'Enter') {
      e.preventDefault();
      if (tag.trim() !== '' && !tagList.includes(tag)) {
        setTagList((prev) => [...prev, tag]);
        setTag('');
      }
    }
  };

  return (
    <form className={formFetchMode === FETCH_MODE.FETCHING ? 'EditorForm disabled' : 'EditorForm'}>
      {errorMessage && <FormError text={errorMessage} />}

      <input
        className="EditorForm-title"
        name="title"
        type="text"
        placeholder="Article Title"
        value={title}
        disabled={formFetchMode === FETCH_MODE.FETCHING ? true : false}
        onChange={changeFormHandler}
      />

      <input
        className="EditorForm-description"
        name="description"
        type="text"
        placeholder="What's this article about?"
        value={description}
        disabled={formFetchMode === FETCH_MODE.FETCHING ? true : false}
        onChange={changeFormHandler}
      />

      <textarea
        className="EditorForm-body"
        name="body"
        placeholder="Write your article (in markdown)"
        value={body}
        disabled={formFetchMode === FETCH_MODE.FETCHING ? true : false}
        onChange={changeFormHandler}
      />

      <input
        className="EditorForm-tags"
        name="tag"
        type="text"
        value={tag}
        placeholder="Enter tags"
        onKeyPress={addTag}
        disabled={formFetchMode === FETCH_MODE.FETCHING ? true : false}
        onChange={changeFormHandler}
      />

      <ul className="EditorForm-tag-list">{showTagList()}</ul>

      <div className="EditorForm-bottom">
        <button
          className="EditorForm-button"
          onClick={submitForm}
          disabled={formFetchMode === FETCH_MODE.FETCHING ? true : false}
        >
          Publish Article
        </button>
      </div>
    </form>
  );
};

export default EditorForm;
