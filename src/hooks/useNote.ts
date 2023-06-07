import { useEffect, useState } from "react";
import noteService, { Note } from "../services/note-service.ts";
import { CanceledError } from "axios";

function useNote(id: string | undefined) {
  const [note, setNote] = useState<Note>();
  const [getNoteErrorMessage, setGetNoteErrorMessage] = useState("");
  const [statusCode, setStatusCode] = useState(0);
  const [isFetchingNote, setIsFetchingNote] = useState(false);

  useEffect(() => {
    setIsFetchingNote(true);
    const result = noteService.getOne<Note>(id);

    if (result) {
      const { response, cancel } = result;

      response
        .then((res) => {
          setNote(res.data);
          setIsFetchingNote(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setGetNoteErrorMessage(err.message);
          setStatusCode(err.response.status);
          setIsFetchingNote(false);
        });

      return () => cancel();
    }
  }, []);

  return {
    note,
    setNote,
    getNoteErrorMessage,
    statusCode,
    setGetNoteErrorMessage,
    isFetchingNote,
    setIsFetchingNote,
  };
}

export default useNote;
