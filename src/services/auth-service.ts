import create from "./http-service.ts";

export interface Auth {
  token: string;
}

export default create("/auth");
