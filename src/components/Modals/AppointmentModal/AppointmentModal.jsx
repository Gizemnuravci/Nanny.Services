import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./AppointmentModal.module.css";

const appointmentSchema = yup.object().shape({
  address: yup.string().required("Address is required"),
  phone: yup.string().required("Phone number is required"),
  childAge: yup.string().required("Child's age is required"),
  time: yup.string().required("Meeting time is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  parentName: yup.string().required("Parent name is required"),
  comment: yup.string().required("Comment is required"),
});

export default function AppointmentModal({ nanny, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(appointmentSchema),
    mode: "onTouched", 
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!nanny) return null;

  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data);
    alert(`Appointment submitted successfully for ${nanny.name}!`);
    onClose();
  };

  const onError = (formErrors) => {
    console.log("Validation Errors:", formErrors);
  };

  return (
    <div
      onClick={onClose}
      className={styles.backdrop}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={styles.modal}
      >
        <button
          onClick={onClose}
          type="button"
          className={styles.closeBtn}
        >
          ✕
        </button>

        <h2 className={styles.title}>
          Make an appointment with a nanny
        </h2>
        <p className={styles.subtitle}>
          Arranging a meeting with{" "}
          <strong>{nanny?.name}</strong>
        </p>

        {nanny?.avatar_url && (
          <div className={styles.nannyInfo}>
            <img
              src={nanny.avatar_url}
              alt={nanny.name}
              className={styles.nannyAvatar}
            />
            <div className={styles.nannyName}>
              <p className={styles.nannyLabel}>Your nanny</p>
              <p className={styles.nannyNameText}>
                {nanny.name}
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit, onError)} className={styles.form}>
          <div className={styles.twoColumnRow}>
            <div className={styles.formGroup}>
              <input
                {...register("address")}
                placeholder="Address"
                className={`${styles.input} ${errors.address ? styles.error : ""}`}
              />
              {errors.address && (
                <p className={styles.errorMessage}>
                  {errors.address.message}
                </p>
              )}
            </div>
            <div className={styles.formGroup}>
              <input
                {...register("phone")}
                placeholder="+380"
                className={`${styles.input} ${errors.phone ? styles.error : ""}`}
              />
              {errors.phone && (
                <p className={styles.errorMessage}>
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          <div className={styles.twoColumnRow}>
            <div className={styles.formGroup}>
              <input
                {...register("childAge")}
                placeholder="Child's age"
                className={`${styles.input} ${errors.childAge ? styles.error : ""}`}
              />
              {errors.childAge && (
                <p className={styles.errorMessage}>
                  {errors.childAge.message}
                </p>
              )}
            </div>
            <div className={styles.formGroup}>
              <input
                type="time"
                {...register("time")}
                className={`${styles.input} ${errors.time ? styles.error : ""}`}
              />
              {errors.time && (
                <p className={styles.errorMessage}>
                  {errors.time.message}
                </p>
              )}
            </div>
          </div>

          <div className={styles.formGroup}>
            <input
              {...register("email")}
              placeholder="Email"
              className={`${styles.input} ${errors.email ? styles.error : ""}`}
            />
            {errors.email && (
              <p className={styles.errorMessage}>
                {errors.email.message}
              </p>
            )}
          </div>

          <div className={styles.formGroup}>
            <input
              {...register("parentName")}
              placeholder="Father's or mother's name"
              className={`${styles.input} ${errors.parentName ? styles.error : ""}`}
            />
            {errors.parentName && (
              <p className={styles.errorMessage}>
                {errors.parentName.message}
              </p>
            )}
          </div>

          <div className={styles.formGroup}>
            <textarea
              {...register("comment")}
              rows={3}
              placeholder="Comment"
              className={`${styles.textarea} ${errors.comment ? styles.error : ""}`}
            />
            {errors.comment && (
              <p className={styles.errorMessage}>
                {errors.comment.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-emerald-700 text-white font-medium text-sm rounded-full hover:bg-emerald-800 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}