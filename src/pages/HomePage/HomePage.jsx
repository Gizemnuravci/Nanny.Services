import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";
import { logoutUser } from "../../firebase/services";
import babyImage from "../../assets/baby.jpg";
import styles from "./HomePage.module.css";

const HomePage = ({ onOpenAuth = () => {} }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const base = import.meta.env.BASE_URL;

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Failed to logout user:", error);
    }
  };

  return (
    <main className={styles.pageWrapper}>
      <section className={styles.heroCard}>
        <div className={styles.leftContent}>
          <header className={styles.brandHeader}>
            <Link to="/" className={styles.logo}>
              Nanny.Services
            </Link>
          </header>

          <div className={styles.mainText}>
            <h1 className={styles.title}>
              <svg
                width="40"
                height="40"
                viewBox="0 0 36 32"
                style={{
                  display: "inline",
                  marginRight: "12px",
                  verticalAlign: "middle",
                }}
              >
                <use href={`${base}symbol-defs.svg#icon-Vector-7`} />
              </svg>
              Make Life Easier
              <br />
              for the Family:
            </h1>

            <p className={styles.subtitle}>
              Find Babysitters Online for All Occasions
            </p>

            <button
              className={styles.getStartedBtn}
              type="button"
              onClick={() => navigate("/nannies")}
              aria-label="Get Started finding babysitters"
            >
              Get started{" "}
              <FiArrowUpRight size={22} className={styles.arrowIcon} />
            </button>
          </div>
        </div>

        <img
          src={babyImage}
          alt="Happy baby with toys"
          className={styles.heroImage}
        />

        <div className={styles.rightContent}>
          <nav className={styles.navHeader} aria-label="Main Navigation">
            <div className={styles.navLinks}>
              <button
                type="button"
                onClick={() => navigate("/")}
                className={`${styles.navBtn} ${styles.activeLink}`}
              >
                Home
              </button>

              <button
                type="button"
                onClick={() => navigate("/nannies")}
                className={styles.navBtn}
              >
                Nannies
              </button>

              {user && (
                <button
                  type="button"
                  onClick={() => navigate("/favorites")}
                  className={styles.navBtn}
                >
                  Favorites
                </button>
              )}
            </div>

            <div className={styles.authButtons}>
              {user ? (
                <div className={styles.userMenu}>
                  <div className={styles.userIconWrapper}>
                    <svg className={styles.userIcon} aria-hidden="true">
                      <use href={`${base}symbol-defs.svg#icon-mdi_user`} />
                    </svg>
                  </div>
                  <span className={styles.userName}>
                    {user.displayName || "User"}
                  </span>
                  <button
                    className={styles.logoutBtn}
                    type="button"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <>
                  <button
                    className={styles.loginBtn}
                    type="button"
                    onClick={() => onOpenAuth("login")}
                  >
                    Log In
                  </button>
                  <button
                    className={styles.registerBtn}
                    type="button"
                    onClick={() => onOpenAuth("register")}
                  >
                    Registration
                  </button>
                </>
              )}
            </div>
          </nav>

          <div className={styles.statisticsCard}>
            <div className={styles.checkIconWrapper} aria-hidden="true">
              <FiCheck size={24} color="#ffffff" />
            </div>
            <div>
              <p className={styles.staTitle}>Experienced nannies</p>
              <p className={styles.staCount}>15,000</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;