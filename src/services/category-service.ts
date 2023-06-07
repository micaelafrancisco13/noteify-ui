import create from "./http-service.ts";

export interface NoteCategory {
  _id: string;
  name: string;
}

export default create("/categories");
