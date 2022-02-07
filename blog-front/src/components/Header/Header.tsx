import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useTypedSelector } from '../../store/selectors';
import { useDispatch } from 'react-redux';
import { setEditorMode } from '../../store/article/actions';
import { EDITOR_MODE } from '../../store/article/types';

import { URLS } from '../../utils/urls/urls';
import Container from '../Container/Container';

import './Header.scss';

const Header: FC = () => {
  // states from store
  const { user } = useTypedSelector((state) => state.user);
  const { editorMode } = useTypedSelector((state) => state.article);

  const dispatch = useDispatch();

  // set (EDITOR_MODE.CREATE_MODE) if user leave Edit page
  const setCreateMode = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    if (editorMode !== EDITOR_MODE.CREATE_MODE) dispatch(setEditorMode(EDITOR_MODE.CREATE_MODE));
  };

  return (
    <header className="Header">
      <Container>
        <div className="Header-content">
          <NavLink to={'/'} className="Header-logo" onClick={setCreateMode}>
            conduit
          </NavLink>

          {/* Navbar start */}
          <nav className="Header-navbar">
            <NavLink
              to={'/'}
              className={({ isActive }) =>
                isActive ? 'Header-navbar__link-active' : 'Header-navbar__link'
              }
              onClick={setCreateMode}
            >
              Home
            </NavLink>

            {/* show/hide create article block if user was authorised or not */}
            {/* create article block start */}
            {user ? (
              <>
                <NavLink
                  to={'/editor'}
                  className={({ isActive }) =>
                    isActive ? 'Header-navbar__link-active' : 'Header-navbar__link'
                  }
                >
                  <i className="ion-compose">&nbsp;New Article</i>
                </NavLink>

                {/* user settings block */}
                <NavLink
                  to={'/settings'}
                  className={({ isActive }) =>
                    isActive ? 'Header-navbar__link-active' : 'Header-navbar__link'
                  }
                  onClick={setCreateMode}
                >
                  <i className="ion-gear-a start">&nbsp;Settings</i>
                </NavLink>

                {/*  user articles block */}
                <NavLink
                  to={`/profile/${user.username}`}
                  className={({ isActive }) =>
                    isActive ? 'Header-navbar__link-active' : 'Header-navbar__link'
                  }
                  onClick={setCreateMode}
                >
                  <img
                    src={user.image || URLS.DEFAULT_LOGO}
                    alt="user-image"
                    className="Header-navbar__link_img"
                  />
                  {user.username}
                </NavLink>
              </>
            ) : (
              <>
                {/* show/hide login and register blocks if user was authorised or not */}
                {/* login block */}
                <NavLink
                  to={'/login'}
                  className={({ isActive }) =>
                    isActive ? 'Header-navbar__link-active' : 'Header-navbar__link'
                  }
                >
                  Sign in
                </NavLink>

                {/* register block */}
                <NavLink
                  to={'/register'}
                  className={({ isActive }) =>
                    isActive ? 'Header-navbar__link-active' : 'Header-navbar__link'
                  }
                >
                  Sign up
                </NavLink>
              </>
            )}
          </nav>
          {/* Navbar end */}
        </div>
      </Container>
    </header>
  );
};

export default Header;
