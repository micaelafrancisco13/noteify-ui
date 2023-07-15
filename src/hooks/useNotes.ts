import { useEffect, useState } from "react";
import noteService, { Note } from "../services/note-service.ts";
import { AxiosError, CanceledError } from "axios";
import { NoteFormData } from "../components/NoteForm/NoteForm.tsx";
import { NavigateFunction } from "react-router-dom";

function useNotes(id?: string | undefined) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note>();
  const [error, setError] = useState<AxiosError>();
  const originalNotes = [...notes];

  const [isFetchingNotes, setIsFetchingNotes] = useState(false);
  useEffect(() => {
    setIsFetchingNotes(true);
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
    console.log("Note form data", data);
    setIsCreatingNote(true);
    noteService
      .create(data)
      .then(() => {
        setIsCreatingNote(false);
        navigate("/");
      })
      .catch((err) => {
        setIsCreatingNote(false);
        setError(err);
      });
  };

  const [isUpdatingNote, setIsUpdatingNote] = useState(false);
  const updateNote = (note: NoteFormData, navigate: NavigateFunction) => {
    setIsUpdatingNote(true);
    noteService
      .update({
        _id: note._id,
        title: note.title,
        description: note.description,
        categoryId: note.categoryId,
        upcomingDate: note.upcomingDate,
      })
      .then(() => {
        setIsUpdatingNote(false);
        navigate("/");
      })
      .catch((err) => {
        setIsUpdatingNote(false);
        setError(err);
      });
  };

  const [isDeletingNote, setIsDeletingNote] = useState(false);
  const deleteNote = (idToBeDeleted: string) => {
    setIsDeletingNote(true);
    setNotes(notes.filter((n) => n._id !== idToBeDeleted));
    noteService
      .delete(idToBeDeleted)
      .then(() => {
        setIsDeletingNote(false);
      })
      .catch((err) => {
        setError(err);
        setNotes(originalNotes);
        setIsDeletingNote(false);
      });
  };

  const noteErrorMessage = error?.message;
  const noteStatusCode = error?.response?.status;

  return {
    notes,
    setNotes,
    currentNote,
    isFetchingNotes,

    createNote,
    isCreatingNote,

    updateNote,
    isUpdatingNote,

    deleteNote,
    isDeletingNote,

    noteErrorMessage,
    noteStatusCode,
  };
}

export default useNotes;
