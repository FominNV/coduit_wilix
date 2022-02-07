import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Homepage from '../pages/Homepage/Homepage';
import Settings from '../pages/Settings/Settings';
import Editor from '../pages/Editor/Editor';
import Profile from '../pages/Profile/Profile';
import Register from '../pages/Register/Register';
import Login from '../pages/Login/Login';
import NotFound from '../pages/NotFound/NotFound';
import RequireAuth from '../ReguireAuth/RequireAuth';
import { useDispatch } from 'react-redux';
import { authUser } from '../../store/user/actions';
import { getToken } from '../../utils/common/common';
import Article from '../pages/Article/Article';
import './App.scss';

function App() {
  const dispatch = useDispatch();

  // Аутентификация
  useEffect(() => {
    const token = getToken();
    if (token) {
      dispatch(authUser());
    }
  }, []);

  return (
    <div className={'App'}>
      <Routes>
        <Route path={'/'} element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route
            path={'settings'}
            element={
              // Защита от входа на страницу в случае прямой ссылки
              <RequireAuth>
                <Settings />
              </RequireAuth>
            }
          />
          <Route
            path={'editor'}
            element={
              <RequireAuth>
                <Editor />
              </RequireAuth>
            }
          />
          <Route path={'profile/:username'} element={<Profile />} />
          <Route path={'login'} element={<Login />} />
          <Route path={'register'} element={<Register />} />
          <Route path={'article/:title'} element={<Article />} />
          <Route path={'*'} element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
