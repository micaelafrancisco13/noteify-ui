import { useEffect, useState } from "react";
import noteService, { Note } from "../services/note-service.ts";
import { AxiosError, CanceledError } from "axios";
import { NoteFormData } from "../components/NoteForm/NoteForm.tsx";
import { NavigateFunction } from "react-router-dom";

function useNotes(id?: string | undefined) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note>();
  const [error, setError] = useState<AxiosError>();

  const [isFetchingNotes, setIsFetchingNotes] = useState(false);
  useEffect(() => {
    let result;

    if (!id) result = noteService.getAll<Note>();
    else result = noteService.getOne<Note>(id);

    if (result) {
      const { response, cancel } = result;

      response
        .then((res) => {
          if (!id) setNotes(res.data as Note[]);
          else setCurrentNote(res.data as Note);
          setIsFetchingNotes(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err);
          setIsFetchingNotes(false);
        });

      return () => cancel();
    }
  }, [id]);

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
        setError(err);
      });
  };

  const errorMessage = error?.message;
  const statusCode = error?.response?.status;

  return {
    notes,
    setNotes,
    currentNote,
    isFetchingNotes,

    createNote,
    isCreatingNote,

    errorMessage,
    statusCode,
  };
}

export default useNotes;
