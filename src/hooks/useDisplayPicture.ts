import { useEffect, useState } from "react";
import displayPictureService, {
  DisplayPicture,
} from "../services/display-picture-service.ts";
import axios, { AxiosError } from "axios";

function useDisplayPicture() {
  const [displayPicture, setDisplayPicture] = useState(
    "https://placehold.co/250"
  );
  const [initialDisplayPicture, setInitialDisplayPicture] = useState(
    "https://placehold.co/250"
  );
  const [error, setError] = useState<AxiosError>();

  const [isFetchingDisplayPicture, setIsFetchingDisplayPicture] =
    useState(false);
  useEffect(() => {
    setIsFetchingDisplayPicture(true);
    const result = displayPictureService.getOne<DisplayPicture>();
    if (result) {
      const { response, cancel } = result;

      response
        .then((res) => {
          setDisplayPicture(res.data.objectUrl);
          setInitialDisplayPicture(res.data.objectUrl);
          setIsFetchingDisplayPicture(false);
        })
        .catch((err) => {
          setError(err);
          setIsFetchingDisplayPicture(false);
        });

      return () => cancel();
    }
  }, []);

  const [isUpdatingDisplayPicture, setIsUpdatingDisplayPicture] =
    useState(false);
  const updateDisplayPicture = (
    uploadedImage: string,
    selectedFileName: string
  ) => {
    setIsUpdatingDisplayPicture(true);
    setDisplayPicture(uploadedImage);

    axios
      .get(uploadedImage, {
        responseType: "blob",
        headers: { "Cache-Control": "no-cache" },
      })
      .then((res) => {
        const formData = new FormData();
        formData.append("image", res.data, selectedFileName);

        displayPictureService
          .upload<DisplayPicture>(formData)
          .then((res) => {
            setDisplayPicture(res.data.objectUrl);
            setIsUpdatingDisplayPicture(false);
          })
          .catch((err) => {
            setError(err);
            setDisplayPicture(initialDisplayPicture);
            setIsUpdatingDisplayPicture(false);
          });
      })
      .catch((err) => {
        setError(err);
        setIsUpdatingDisplayPicture(false);
      });
  };

  const displayPictureErrorMessage = error?.message;
  const displayPictureStatusCode = error?.response?.status;

  return {
    initialDisplayPicture,
    displayPicture,
    setDisplayPicture,
    isFetchingDisplayPicture,

    updateDisplayPicture,
    isUpdatingDisplayPicture,

    displayPictureErrorMessage,
    displayPictureStatusCode,
  };
}

export default useDisplayPicture;
