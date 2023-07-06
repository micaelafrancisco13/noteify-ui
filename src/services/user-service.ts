import create from "./http-service.ts";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateRegistered: string;
  dateLoggedIn: string;
}

export default create("/users");
