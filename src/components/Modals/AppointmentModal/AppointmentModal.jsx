import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


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
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl p-8 max-w-lg w-full relative shadow-xl"
      >
        <button
          onClick={onClose}
          type="button"
          className="absolute top-6 right-6 text-2xl text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-1 text-gray-900">
          Make an appointment with a nanny
        </h2>
        <p className="text-gray-500 text-sm mb-4">
          Arranging a meeting with{" "}
          <strong className="text-gray-800">{nanny?.name}</strong>
        </p>

        {nanny?.avatar_url && (
          <div className="flex items-center gap-3 mb-5">
            <img
              src={nanny.avatar_url}
              alt={nanny.name}
              className="w-11 h-11 rounded-xl object-cover"
            />
            <div>
              <p className="text-xs text-gray-400">Your nanny</p>
              <p className="text-sm font-semibold text-gray-800">
                {nanny.name}
              </p>
            </div>
          </div>
        )}

     
        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                {...register("address")}
                placeholder="Address"
                className={`w-full p-3 border rounded-xl text-sm ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...register("phone")}
                placeholder="+380"
                className={`w-full p-3 border rounded-xl text-sm ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                {...register("childAge")}
                placeholder="Child's age"
                className={`w-full p-3 border rounded-xl text-sm ${
                  errors.childAge ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.childAge && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.childAge.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="time"
                {...register("time")}
                className={`w-full p-3 border rounded-xl text-sm ${
                  errors.time ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.time && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.time.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <input
              {...register("email")}
              placeholder="Email"
              className={`w-full p-3 border rounded-xl text-sm ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("parentName")}
              placeholder="Father's or mother's name"
              className={`w-full p-3 border rounded-xl text-sm ${
                errors.parentName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.parentName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.parentName.message}
              </p>
            )}
          </div>

          <div>
            <textarea
              {...register("comment")}
              rows={3}
              placeholder="Comment"
              className={`w-full p-3 border rounded-xl text-sm resize-none ${
                errors.comment ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.comment && (
              <p className="text-red-500 text-xs mt-1">
                {errors.comment.message}
              </p>
            )}
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