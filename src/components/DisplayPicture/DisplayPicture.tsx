import "cropperjs/dist/cropper.css";
import { Box, IconButton, Stack } from "@mui/material";
import useImageCrop from "../../hooks/useImageCrop.ts";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { ChangeEvent, useState } from "react";
import useModal from "../../hooks/useModal.ts";
import DisplayPictureModal from "./DisplayPictureModal.tsx";

function DisplayPicture() {
  const [uploadedImage, setUploadedImage] = useState(
    "https://placehold.co/1000"
  );
  const { modalToggle, handleOpen, handleClose } = useModal();
  const { imageRef, handleCrop, handleRemoveCropCanvas, croppedImage } =
    useImageCrop([uploadedImage, modalToggle]);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setUploadedImage(URL.createObjectURL(file));
    handleOpen();
  };

  const handleModalClose = () => {
    handleClose();
    handleRemoveCropCanvas();
    setUploadedImage(croppedImage ? croppedImage : "https://placehold.co/1000");
  };

  const handleApplyCrop = () => {
    handleCrop();
    handleModalClose();
  };

  return (
    <Stack spacing={1} justifyContent="center" alignItems="center">
      <Box>
        {!croppedImage && !modalToggle && (
          <img
            src={uploadedImage}
            alt="Current display picture"
            className="display-picture"
          />
        )}
        {croppedImage && (
          <img
            src={croppedImage}
            alt="Cropped image"
            className="display-picture"
          />
        )}
      </Box>
      {!modalToggle && (
        <>
          <input
            hidden
            type="file"
            accept="image/*"
            id="upload-display-picture"
            onChange={handleImageUpload}
            key={Date.now()}
          />
          <label htmlFor="upload-display-picture">
            <IconButton
              aria-label="Update display picture"
              color="primary"
              component="span"
            >
              <CameraAltIcon />
            </IconButton>
          </label>
        </>
      )}
      <DisplayPictureModal
        modalToggle={modalToggle}
        handleClose={handleModalClose}
        uploadedImage={uploadedImage}
        imageRef={imageRef}
        handleApplyCrop={handleApplyCrop}
      />
    </Stack>
  );
}

export default DisplayPicture;
