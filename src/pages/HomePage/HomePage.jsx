import { useNavigate } from "react-router-dom";
import { FiArrowUpRight, FiCheck } from 'react-icons/fi';
import styles from "./HomePage.module.css";

const HomePage = ({ onOpenAuth = () => {} }) => {
  const navigate = useNavigate();

  return (
    <main className={styles.pageWrapper}>
      <section className={styles.heroCard}>
        <div className={styles.leftContent}>
          <header className={styles.brandHeader}>
            <span className={styles.logo}>Nanny.Services</span>
          </header>

          <div className={styles.mainText}>
            <h1 className={styles.title}>
              Make Life Easier
              <br />
              for the Family:
            </h1>

            <p className={styles.subtitle}>Find Babysitters Online for All Occasions</p>

            <button
              className={styles.getStartedBtn}
              type="button"
              onClick={() => navigate('/nannies')}
              aria-label="Get Started finding babysitters"
            >
              Get started <FiArrowUpRight size={22} className={styles.arrowIcon} />
            </button>
          </div>
        </div>

        <div className={styles.rightContent}>
          <nav className={styles.navHeader} aria-label="Main Navigation">
            <div className={styles.navLinks}>
              <button
                type="button"
                onClick={() => navigate('/')}
                className={`${styles.navBtn} ${styles.activeLink}`}
              >
                Home
              </button>

              <button
                type="button"
                onClick={() => navigate('/nannies')}
                className={styles.navBtn}
              >
                Nannies
              </button>
            </div>

            <div className={styles.authButtons}>
              <button
                className={styles.loginBtn}
                type="button"
                onClick={() => onOpenAuth('login')}
              >
                Log In
              </button>
              <button
                className={styles.registerBtn}
                type="button"
                onClick={() => onOpenAuth('register')}
              >
                Registration
              </button>
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