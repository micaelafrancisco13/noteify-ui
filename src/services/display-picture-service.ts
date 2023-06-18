import create from "./http-service.ts";

export interface DisplayPicture {
  fileName: string;
  objectUrl: string;
}

export default create("/users/display-picture");
