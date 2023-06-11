import axios, { CanceledError } from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});

instance.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("Intercepted error", expectedError);
  }

  return Promise.reject(error);
});

export default instance;
export { CanceledError };
