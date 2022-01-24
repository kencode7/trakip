// Import
import axios from "axios";
import { apiURL } from "@/utils/core/config";

import { showNotification } from "@/utils/notifications/show-notification";
import { invalidArr } from "../mixin";
import NProgress from "nprogress";

// Create
const service = axios.create({
  baseURL: apiURL,
  headers: {
    Accept: "application/json",
  },
});

// Request Interceptor
service.interceptors.request.use(
  (config) => {
    NProgress.start();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
service.interceptors.response.use(
  (response) => {
    NProgress.done();
    return !invalidArr.includes(response.data.data)
      ? response.data.data
      : response.status === 201
      ? true
      : false;
  },
  (error) => {
    NProgress.done();

    if (error?.request?.url?.indexOf("initial")) return;

    let errors = error;

    if (error.response) {
      // Session Expired
      if (401 === error.response.status) {
        errors = error.response.data.message;
        // store.dispatch('logOut')
      }

      // Errors from backend
      if (error.response.status == 422) {
        errors = "";
        for (const errorKey in error.response.data.errors) {
          errors += "\n";
          errors += error.response.data.errors[errorKey].detail + "<br>";
        }
      }

      // Backend error
      if (500 === error.response.status) {
        errors = error.response.data.message;
      }

      // Server down
      if (503 === error.response.status) {
        errors = error.response.data.message;
      }

      // 404
      if (error.response.status == 404) {
        errors = "Page not found!";
      }
    }

    const message = error?.response?.data?.message || errors?.message;
    const shouldNotify = error?.response?.data?.should_notify;

    if (shouldNotify === undefined) {
      showNotification({
        message: message,
        success: false,
      });
    }

    return null;
  }
);

export { service };
