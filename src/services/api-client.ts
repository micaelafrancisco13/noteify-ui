import axios, { CanceledError } from "axios";

export default axios.create({
  baseURL: "http://localhost:3000/api",
});

function setJwt(jwt: string | null) {
  axios.defaults.headers.common["Authorization"] = jwt;
}

export { CanceledError, setJwt };
