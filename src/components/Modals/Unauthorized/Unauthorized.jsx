import styles from './Unauthorized.module.css';

const Unauthorized = ({ onClose, onOpenLogin }) => {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
        
        >
          X
        </button>
        <h2 className={styles.title}>Unauthorized</h2>
        <p className={styles.subtitle}>
          This feature is available only for authorized users . Please log in to your account.
        </p>
        <button
          type="button"
          className={styles.loginBtn}
          onClick={() => {
            onClose();
            onOpenLogin();
          }}
        
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;