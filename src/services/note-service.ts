import create from "./http-service.ts";
import { NoteCategory } from "./category-service.ts";

export interface Note {
  _id: string;
  title: string;
  description: string;
  category: NoteCategory;
  user: string;
  upcomingDate: string;
  dateCreated: string;
  dateLastModified: string;
}

export default create("/notes");
