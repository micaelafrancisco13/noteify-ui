import { useEffect, useState } from "react";
import noteService, { Note } from "../services/note-service.ts";
import { CanceledError } from "axios";

function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState("");
  const [isFetchingNotes, setIsFetchingNotes] = useState(false);

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
        setError(err.message);
        setIsFetchingNotes(false);
      });

    return () => cancel();
  }, []);

  return {
    notes,
    setNotes,
    error,
    setError,
    isFetchingNotes,
    setIsLoading: setIsFetchingNotes,
  };
}

export default useNotes;
