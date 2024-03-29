import { Link } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { logoutAction } from '../../store/api-actions';
import Logo from '../logo/logo';

export default function Header(): JSX.Element {
  const isAuthorized = useAppSelector((state) => state.authorizationStatus) === AuthorizationStatus.Auth;
  const userData = useAppSelector((state) => state.userData);
  const dispatch = useAppDispatch();
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link
                  to={isAuthorized ? AppRoute.Favorites : AppRoute.Login}
                  className="header__nav-link header__nav-link--profile"
                >
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  {isAuthorized ? (
                    <>
                      <span className="header__user-name user__name">{userData.email}</span>
                      <span className="header__favorite-count">3</span>

                    </>)
                    : <span className="header__login">Sign in</span>}
                </Link>
              </li>
              {isAuthorized &&
                <li className="header__nav-item">
                  <Link
                    onClick={(evt) => {
                      evt.preventDefault();
                      dispatch(logoutAction());
                    }}
                    className="header__nav-link"
                    to={AppRoute.Login}
                  >
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
