import { toast } from "sonner";

export const notifyError = (
  message: string,
  title: string = "حدث خطأ"
) => {
  toast.error(title, {
    description: message,
  });
};

export const notifySuccess = (message: string) => {
  toast.success(message);
};

export const notifyWarning = (message: string) => {
  toast.warning(message);
};

export const notifyLoading = (message: string) => {
  toast.loading(message);
};