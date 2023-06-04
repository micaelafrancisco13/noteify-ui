import * as categoriesAPI from "./categories.ts";
import { NoteFormData } from "../components/NoteForm/NoteForm.tsx";

export interface Note {
  _id: string;
  title: string;
  description: string;
  category: categoriesAPI.NoteCategory;
  dateCreated: string;
  dateLastModified: string;
  upcomingDate: string;
}

const notes: Note[] = [
  {
    _id: "647ad99010aa3f982f9bc76f",
    title: "Title 2",
    description: "Description 2",
    category: {
      _id: "64734985e6106c7e56ca9983",
      name: "Cat_1",
    },
    upcomingDate: "2023-06-03T00:00:00.000Z",
    dateCreated: "2023-06-03T06:11:28.833Z",
    dateLastModified: "2023-06-03T06:11:28.833Z",
  },
  {
    _id: "647ad78d38b1a27747a83480",
    title: "Title 1",
    description: "Description 1",
    category: {
      _id: "64734fb3ecf85f7bb37ccf81",
      name: "Cat_2",
    },
    upcomingDate: "2023-06-04T00:00:00.000Z",
    dateCreated: "2023-06-03T06:02:53.621Z",
    dateLastModified: "2023-06-03T06:02:53.621Z",
  },
  {
    _id: "647adaf6b9351383c4edac52",
    title: "Title 3",
    description: "Description 3",
    category: {
      _id: "64734fb3ecf85f7bb37ccf81",
      name: "Cat_2",
    },
    upcomingDate: "2023-06-02T00:00:00.000Z",
    dateCreated: "2023-06-01T00:00:00.000Z",
    dateLastModified: "2023-06-01T00:00:00.000Z",
  },
];

export function getNotes() {
  return notes;
}

export function createNote(note: NoteFormData) {
  const category = categoriesAPI
    .getCategories()
    .find((c) => c._id === note.categoryId);

  if (category) {
    const dateNow = new Date().toISOString();
    const newNote: Note = {
      _id: notes.length.toString(),
      title: note.title,
      description: note.description,
      category,
      dateCreated: dateNow,
      dateLastModified: dateNow,
      upcomingDate: note.upcomingDate.toISOString(),
    };

    notes.push(newNote);

    return newNote;
  }
}

export function updateNote(note: NoteFormData & { id: string | undefined }) {
  const category = categoriesAPI
    .getCategories()
    .find((c) => c._id === note.categoryId);

  if (category) {
    const currentNote = notes.find((n) => n._id === note.id);

    if (currentNote) {
      const dateNow = new Date().toISOString();

      currentNote.title = note.title;
      currentNote.description = note.description;
      currentNote.category = category;
      currentNote.dateLastModified = dateNow;
      currentNote.upcomingDate = note.upcomingDate.toISOString();

      return currentNote;
    }
    console.log("updated note", currentNote);
  }
}

export function deleteNote(id: string) {
  const deletedNote = notes.find((n) => n._id === id);

  if (deletedNote) notes.splice(notes.indexOf(deletedNote), 1);

  return deletedNote;
}

export function getSpecificNote(id: string) {
  return notes.find((n) => n._id === id);
}
