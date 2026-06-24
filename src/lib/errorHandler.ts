/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";

export const handleApiError = (
  error: any,
  fallbackMessage = "Something went wrong",
) => {
  let title = "Error";
  let message = fallbackMessage;

  if (!navigator.onLine) {
    title = "No Internet";
    message = "Your connection dropped. Please check your network and try again.";
  } else if (
    error.code === "ERR_NETWORK" ||
    error.message === "Network Error" ||
    (!error.response && !error.code)
  ) {
    title = "Network Error";
    message = "Unable to reach the server. Your connection may have dropped.";
  } else if (error.code === "ECONNABORTED") {
    title = "Request Timed Out";
    message = "The server took too long to respond. Please try again.";
  } else if (error.response) {
    const status = error.response.status;
    switch (status) {
      case 400:
        title = "Bad Request";
        message =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Invalid request. Please check your input.";
        break;
      case 401:
        title = "Unauthorized";
        message =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Please log in again.";
        break;
      case 403:
        title = "Access Denied";
        message =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          "You don't have permission.";
        break;
      case 404:
        title = "Not Found";
        message =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Resource not found.";
        break;
      case 422:
        title = "Validation Error";
        message =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Please correct the errors.";
        break;
      case 500:
        title = "Server Error";
        message =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Something went wrong on our end.";
        break;
      case 503:
        title = "Service Unavailable";
        message =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Try again in a few minutes.";
        break;
      default:
        title = "Unexpected Error";
        message =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          fallbackMessage;
        break;
    }
  }

  toast.error(`${title}: ${message}`);

  return {
    status: error?.response?.status || 0,
    success: false,
    message,
    originalError: error,
  };
};
