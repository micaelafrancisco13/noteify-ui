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
    _id: "6473782be1752faca88a0d91",
    title: "New note 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Leo a diam sollicitudin tempor id eu nisl nunc.",
    category: {
      _id: "647357f50625410a6c931ff8",
      name: "Cat_5",
    },
    dateCreated: "2023-05-28T15:50:03.045Z",
    dateLastModified: "2023-05-28T15:50:03.045Z",
    upcomingDate: "2023-05-28T15:50:03.045Z",
  },
  {
    _id: "6473782be1752faca88a0d92",
    title: "New note 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis. Eu feugiat pretium nibh ipsum consequat nisl. Eget sit amet tellus cras adipiscing enim eu turpis.",
    category: {
      _id: "647357f50625410a6c931ff8",
      name: "Cat_5",
    },
    dateCreated: "2023-05-28T15:50:03.045Z",
    dateLastModified: "2023-05-28T15:50:03.045Z",
    upcomingDate: "2023-05-28T15:50:03.045Z",
  },
  {
    _id: "64737818e1752faca88a0d93",
    title: "New note 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sapien et ligula ullamcorper malesuada proin libero nunc. Donec pretium vulputate sapien nec. Nulla porttitor massa id neque aliquam vestibulum morbi blandit. Consequat nisl vel pretium lectus quam.",
    category: {
      _id: "647357f50625410a6c931ff8",
      name: "Cat_5",
    },
    dateCreated: "2023-05-28T15:49:44.060Z",
    dateLastModified: "2023-05-28T15:49:44.060Z",
    upcomingDate: "2023-05-28T15:50:03.045Z",
  },
  {
    _id: "64737818e1752faca88a0d94",
    title: "New note 4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis. Eu feugiat pretium nibh ipsum consequat nisl. Eget sit amet tellus cras adipiscing enim eu turpis. Sapien faucibus et molestie ac feugiat sed. Quam nulla porttitor massa id neque aliquam. Scelerisque felis imperdiet proin fermentum leo vel. Mauris a diam maecenas sed enim ut sem viverra aliquet.",
    category: {
      _id: "647357f50625410a6c931ff8",
      name: "Cat_5",
    },
    dateCreated: "2023-05-28T15:49:44.060Z",
    dateLastModified: "2023-05-28T15:49:44.060Z",
    upcomingDate: "2023-05-28T15:50:03.045Z",
  },
  {
    _id: "64737818e1752faca88a0d95",
    title: "New note 5",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Leo a diam sollicitudin tempor id eu nisl nunc. Congue nisi vitae suscipit tellus mauris a. Dapibus ultrices in iaculis nunc sed augue lacus viverra. Congue eu consequat ac felis donec et. Amet commodo nulla facilisi nullam vehicula ipsum. Ut etiam sit amet nisl. Maecenas pharetra convallis posuere morbi. Lectus magna fringilla urna porttitor rhoncus. Fringilla ut morbi tincidunt augue interdum. Sodales ut etiam sit amet. Bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim.",
    category: {
      _id: "647357f50625410a6c931ff8",
      name: "Cat_5",
    },
    dateCreated: "2023-05-28T15:49:44.060Z",
    dateLastModified: "2023-05-28T15:49:44.060Z",
    upcomingDate: "2023-05-28T15:50:03.045Z",
  },
  {
    _id: "64737818e1752faca88a0d96",
    title: "New note 6",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: {
      _id: "647357f50625410a6c931ff8",
      name: "Cat_5",
    },
    dateCreated: "2023-05-28T15:49:44.060Z",
    dateLastModified: "2023-05-28T15:49:44.060Z",
    upcomingDate: "2023-05-28T15:50:03.045Z",
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
