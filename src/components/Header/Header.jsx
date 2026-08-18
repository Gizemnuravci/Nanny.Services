import { NavLink, Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = ({
  onOpenAuthModal = () => {},
  user,
  onLogout = () => {},
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          Nanny.Services
        </Link>

        <nav className={styles.navigation}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/nannies"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Nannies
          </NavLink>
          {user && (
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Favorites
            </NavLink>
          )}
        </nav>

        <div className={styles.authWrapper}>
          {user ? (
            <div className={styles.userMenu}>
              <div className={styles.userIconWrapper}>
                <svg className={styles.userIcon} aria-hidden="true">
                  <use href={`${import.meta.env.BASE_URL}symbol-defs.svg#icon-mdi_user`} />
                </svg>
              </div>
              <span className={styles.userName}>{user.displayName || 'User'}</span>
              <button type="button" className={styles.logoutBtn} onClick={onLogout}>
                Log Out
              </button>
            </div>
          ) : (
            <>
              <button
                type="button"
                className={styles.loginBtn}
                onClick={() => onOpenAuthModal('login')}
              >
                Log In
              </button>
              <button
                type="button"
                className={styles.registerBtn}
                onClick={() => onOpenAuthModal('register')}
              >
                Registration
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;