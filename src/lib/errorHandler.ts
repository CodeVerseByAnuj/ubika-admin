/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";

export const handleApiError = (
  error: any,
  fallbackMessage = "Something went wrong",
) => {
  let title = "Error";
  let message = fallbackMessage;

  if (!navigator.onLine) {
    title = "Network Error";
    message = "No internet connection. Please check your network.";
  }

  // ✅ Handle Axios/network/server error
  else if (!error.response) {
    title = "Network Error";
    message = "Unable to reach the server. Please try again.";
  } else {
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
        title = "";
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
          "You don’t have permission.";
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

  toast.error(title + message);

  return {
    status: error?.response?.status || 500,
    success: false,
    message,
    originalError: error,
  };
};
