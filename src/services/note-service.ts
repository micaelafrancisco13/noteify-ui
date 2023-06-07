import create from "./http-service.ts";
import * as categoriesAPI from "./categories.ts";

export interface Note {
  _id: string;
  title: string;
  description: string;
  category: categoriesAPI.NoteCategory;
  user: string;
  upcomingDate: string;
  dateCreated: string;
  dateLastModified: string;
}

export default create("/notes");
