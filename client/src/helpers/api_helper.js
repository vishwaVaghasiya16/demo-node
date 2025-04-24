import axios from "axios";
import { baseUrl } from "../config/config";
import { toastError } from "./toastConfig";
import { debounce } from "lodash";

const getToken = () => {
  const token = localStorage.getItem("token");
  return token ? token : "";
};

const api = axios.create({
  baseURL: baseUrl || "http://localhost:8080",
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

// Interceptors for handling requests data
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("[ERROR]:", error);
    return Promise.reject(error);
  }
);

const debouncedToastError = debounce(
  (message) => {
    toastError(message);
  },
  3000,
  { leading: true, trailing: false }
);

// Interceptors for handling response data
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      debouncedToastError(error.message);
      localStorage.removeItem("token");
    } else if (error.response.data.Authentication) {
      debouncedToastError(error.response.data.Authentication);
    } else {
      console.log("[ERROR]:", error);
    }

    return Promise.reject(error);
  }
);

class APIHandler {
  static get(url, queryParams) {
    const token = getToken();
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const queryArray = [];

    if (queryParams) {
      for (let [key, value] of Object.entries(queryParams)) {
        // if (value?.trim()) {
        queryArray.push(`${key}=${value}`);
        // }
      }
    }

    return api.get(url + "?" + queryArray.join("&"));
  }

  static post(url, data) {
    const token = getToken();
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return api.post(url, data);
  }

  static patch(url, data) {
    const token = getToken();
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return api.patch(url, data);
  }

  static delete(url) {
    const token = getToken();
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return api.delete(url);
  }
}

export { APIHandler, getToken };
