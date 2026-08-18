import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './AuthModal.module.css';


const AuthModal = ({ mode, onClose, onSwitchMode }) => {
  const isRegister = mode === 'register';

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: isRegister ? Yup.string().required('Required') : Yup.string(),
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().min(6, 'At least 6 characters').required('Reguired'),

    }),
    onSubmit: (values) => {
      console.log('Auth Data:', values);
      onClose();
    },
  });

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

        <h2 className={styles.title}>{isRegister ? 'Registration' : 'Log In'}</h2>
        <p className={styles.subtitle}>
          {isRegister
            
            ? 'Thank you  for your interest in our service ! Please provide the following information. '
            : 'Welcome back ! Please enter your credentials to access your account.'

          }
        </p>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          {isRegister && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              {...formik.getFieldProps('name')}
            
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            {...formik.getFieldProps('email')}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            {...formik.getFieldProps('password')}
          />
          <button
            type="submit"
            className={styles.submitBtn}
          
          >
            {isRegister ? 'Sign Up' : 'Log In'}
          </button>
        </form>
        <div className={styles.switchWrapper}>
          <span>
            {isRegister ? 'Already have on account?' : "Don't have an account?"}
          </span>
          <button
            type='button'
            className={styles.switchBtn}
            onClick={ () => onSwitchMode(isRegister ? 'login' : 'register')}
          >
            {isRegister ? 'Log In' : 'Registration'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;