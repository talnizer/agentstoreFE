import axios, {
  AxiosRequestConfig,
  AxiosInstance,
} from "axios";
import { toast } from "react-toastify";

export const initialization = (config: AxiosRequestConfig): AxiosInstance => {
  // const { token } = AuthUser();
  // (config.headers as AxiosHeaders).set("Authorization", "Bearer " + token);

  const axiosInstance = axios.create(config);

  // axiosInstance.defaults.headers.common['Authorization'] =
  /*
        Add default headers, interceptors etc..
        
    */
  axiosInstance.interceptors.request.use(
    // (response) => response,
    config => {
      if (config.headers.Authorization !== false) {
        const token = getToken();
        if (token) {
          config.headers.Authorization = "Bearer " + token;
        }
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  axiosInstance.interceptors.response.use(
    response => {
      // console.log(response.data);
      // console.log(response.status);
      if (response.data.status === 0) {
        toast.dismiss();
        toast.error(response.data.message);
      }
      return response;
    },
    async error => {
      // console.log(error);
      if (error?.response?.data) {
        toast.dismiss();
        toast.error(error.response.data.message);
        return Promise.reject(error.response.data);
      } else {
        toast.dismiss();
        toast.error(error.message);
        return Promise.reject(error);
      }
    }
  );
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    if (tokenString) {
      const userToken = JSON.parse(tokenString);
      return userToken;
    }
    return null;
  };

  return axiosInstance;
};

// export default initialization;
