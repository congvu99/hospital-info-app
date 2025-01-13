// src/hooks/useToast.ts
import { toast } from "react-toastify";
import { toastConfig } from "../components/Toast/toastConfig";

export const useToast = () => {
    const showSuccess = (message: string) => {
        toast.success(message, toastConfig);
    };

    const showError = (message: string) => {
        toast.error(message, toastConfig);
    };

    const showInfo = (message: string) => {
        toast.info(message, toastConfig);
    };

    const showWarning = (message: string) => {
        toast.warning(message, toastConfig);
    };

    return {
        showSuccess,
        showError,
        showInfo,
        showWarning,
    };
};
