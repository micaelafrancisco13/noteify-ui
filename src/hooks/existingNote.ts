import noteService, { Note } from "../services/note-service.ts";
import { NoteFormData } from "../components/NoteForm/NoteForm.tsx";
import { NavigateFunction } from "react-router-dom";
import { useState } from "react";

function existingNote(
  originalNotes: Note[],
  setNotes: (notes: Note[]) => void,
  navigate: NavigateFunction
) {
  const [createNoteErrorMessage, setCreateNoteErrorMessage] = useState("");
  const [isCreatingNote, setIsCreatingNote] = useState(false);

  const createNote = (data: NoteFormData) => {
    setIsCreatingNote(true);
    noteService
      .create(data)
      .then((res) => {
        setNotes([...originalNotes, res.data]);
        setIsCreatingNote(false);
        navigate("/");
      })
      .catch((err) => {
        setNotes(originalNotes);
        setIsCreatingNote(false);
        setCreateNoteErrorMessage(err.message);
      });
  };

  return { createNote, createNoteErrorMessage, isCreatingNote };
}

export default existingNote;
