import "cropperjs/dist/cropper.css";
import { Box, IconButton, Stack } from "@mui/material";
import CustomButton from "../custom/CustomButton.tsx";
import useImageCrop from "../../hooks/useImageCrop.ts";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { ChangeEvent, useState } from "react";
import Me from "../../assets/me.png";

function DisplayPicture() {
  const [uploadedImage, setUploadedImage] = useState(
    "https://placehold.co/300"
  );
  const { imageRef, handleCrop, croppedImage } = useImageCrop(uploadedImage);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setUploadedImage(URL.createObjectURL(file));
  };

  return (
    <Stack spacing={4} justifyContent="center" alignItems="center">
      <Stack spacing={1} justifyContent="center" alignItems="center">
        <Box>
          {!croppedImage ? (
            <img
              ref={imageRef}
              src={uploadedImage}
              // src={Me}
              alt="Image to crop"
              className="display-picture"
            />
          ) : (
            <img
              src={croppedImage}
              alt="Cropped image"
              className="cropped-image"
            />
          )}
        </Box>
        {/*CHOOSE AN IMAGE*/}
        <input
          hidden
          type="file"
          accept="image/*"
          id="upload-display-picture"
          onChange={handleImageUpload}
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
      </Stack>

      <CustomButton onClick={handleCrop} variant="outlined">
        Crop Image
      </CustomButton>
    </Stack>
  );
}

export default DisplayPicture;
