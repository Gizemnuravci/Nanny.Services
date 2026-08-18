import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { registerUser, loginUser } from "../../../firebase/services";
import styles from "./AuthModal.module.css";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const registerSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const AuthModal = ({ mode, onClose, onSwitchMode }) => {
  const isRegister = mode === "register";
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(isRegister ? registerSchema : loginSchema),
    mode: "onTouched",
  });

  // Reset validation state when mode changes
  useEffect(() => {
    reset();
    setErrorMsg("");
  }, [mode, reset]);

  // Handle Escape key closure
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const onSubmit = async (data) => {
    try {
      setErrorMsg("");
      if (isRegister) {
        await registerUser(data.name, data.email, data.password);
      } else {
        await loginUser(data.email, data.password);
      }
      onClose();
    } catch (error) {
      setErrorMsg(error.message || "Authentication failed. Please try again.");
    }
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        <h2 className={styles.title}>{isRegister ? "Registration" : "Log In"}</h2>
        <p className={styles.subtitle}>
          {isRegister
            ? "Thank you for your interest in our service! Please provide the following information."
            : "Welcome back! Please enter your credentials to access your account."}
        </p>

        {errorMsg && <div className={styles.globalError}>{errorMsg}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {isRegister && (
            <>
              <input
                type="text"
                placeholder="Name"
                className={errors.name ? styles.inputError : ""}
                {...register("name")}
              />
              {errors.name && <p className={styles.errorText}>{errors.name.message}</p>}
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            className={errors.email ? styles.inputError : ""}
            {...register("email")}
          />
          {errors.email && <p className={styles.errorText}>{errors.email.message}</p>}

          <input
            type="password"
            placeholder="Password"
            className={errors.password ? styles.inputError : ""}
            {...register("password")}
          />
          {errors.password && (
            <p className={styles.errorText}>{errors.password.message}</p>
          )}

          <button type="submit" className={styles.submitBtn}>
            {isRegister ? "Sign Up" : "Log In"}
          </button>
        </form>

        <div className={styles.switchWrapper}>
          <span>
            {isRegister ? "Already have an account?" : "Don't have an account?"}
          </span>
          <button
            type="button"
            className={styles.switchBtn}
            onClick={() => onSwitchMode(isRegister ? "login" : "register")}
          >
            {isRegister ? "Log In" : "Registration"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;