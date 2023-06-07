import { useEffect, useState } from "react";
import noteService, { Note } from "../services/note-service.ts";
import { CanceledError } from "axios";

function useNote(id: string | undefined) {
  const [note, setNote] = useState<Note>();
  const [error, setError] = useState("");
  const [isFetchingNote, setIsFetchingNote] = useState(false);

  useEffect(() => {
    setIsFetchingNote(true);
    const { response, cancel } = noteService.getOne<Note>(id);
    response
      .then((res) => {
        setNote(res.data);
        setIsFetchingNote(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setIsFetchingNote(false);
      });

    return () => cancel();
  }, []);

  return {
    note,
    setNote,
    error,
    setError,
    isFetchingNote,
    setIsFetchingNote,
  };
}

export default useNote;
