import { useEffect, useState } from "react";
import noteService, { Note } from "../services/note-service.ts";
import { CanceledError } from "axios";

function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const { response, cancel } = noteService.getAll<Note>();
    response
      .then((res) => {
        setNotes(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setIsLoading(false);
      });

    return () => cancel();
  }, []);

  return { notes, setNotes, error, setError, isLoading, setIsLoading };
}

export default useNotes;
