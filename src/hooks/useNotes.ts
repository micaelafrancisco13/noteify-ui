import { useEffect, useState } from "react";
import noteService, { Note } from "../services/note-service.ts";
import { CanceledError } from "axios";
import { NoteFormData } from "../components/NoteForm/NoteForm.tsx";
import { NavigateFunction } from "react-router-dom";

function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isFetchingNotes, setIsFetchingNotes] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsFetchingNotes(true);
    const { response, cancel } = noteService.getAll<Note>();
    response
      .then((res) => {
        setNotes(res.data);
        setIsFetchingNotes(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setErrorMessage(err.message);
        setIsFetchingNotes(false);
      });

    return () => cancel();
  }, []);

  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const createNote = (data: NoteFormData, navigate: NavigateFunction) => {
    const originalNotes = [...notes];
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
        setErrorMessage(err.message);
      });
  };

  return {
    notes,
    setNotes,
    isFetchingNotes,

    createNote,
    isCreatingNote,

    errorMessage,
    setErrorMessage,
  };
}

export default useNotes;
