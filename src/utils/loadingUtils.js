import { useAuth } from "../context/ContextApi";
import { toast } from 'react-toastify';
import { successMsg, errorMsg } from "../constants";

function LoadingUtils() {
    const { toastId } = useAuth();
    const makeLoading = (msg = "Loading...") => {
        toastId.current = toast.loading(msg);
    }
    const stopLoadingSuccess = (msg = successMsg) => {
        toast.update(toastId.current, { render: msg, type: "success", isLoading: false, autoClose: 5000, closeButton: true });
        setTimeout(() => {
            toast.dismiss();
        }, 5000);
    }
    const stopLoadingError = (msg = errorMsg) => {
        toast.update(toastId.current, { render: msg, type: "error", isLoading: false, autoClose: 5000, closeButton: true });
        setTimeout(() => {
            toast.dismiss();
        }, 5000);
    }
    return { makeLoading, stopLoadingError, stopLoadingSuccess };
}

export default LoadingUtils;