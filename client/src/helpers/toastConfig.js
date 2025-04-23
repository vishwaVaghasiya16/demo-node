import toast from "react-hot-toast";

export const toastSuccess = (message) => {
  toast.success(message);
};

export const toastError = (error) => {
  toast.error(error);
};
