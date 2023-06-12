import create from "./http-service.ts";

export interface CurrentUser {
  _id: string | null;
  iat: Date;
}

export default create("/auth");
