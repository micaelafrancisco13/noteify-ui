import create from "./http-service.ts";

export interface Account {
  firstName: string;
  lastName: string;
  email: string;
}

export default create("/users/me");
