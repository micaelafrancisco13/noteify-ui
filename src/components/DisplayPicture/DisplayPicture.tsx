import "cropperjs/dist/cropper.css";
import { Box, IconButton, Stack } from "@mui/material";
import useImageCrop from "../../hooks/useImageCrop.ts";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { ChangeEvent, useEffect, useState } from "react";
import useModal from "../../hooks/useModal.ts";
import DisplayPictureModal from "./DisplayPictureModal.tsx";
import useDisplayPicture from "../../hooks/useDisplayPicture.ts";

function DisplayPicture() {
    const {
        initialDisplayPicture,
        displayPicture,
        setDisplayPicture,
        updateDisplayPicture,
    } = useDisplayPicture();
    const { modalToggle, handleOpen, handleClose } = useModal();
    const { imageRef, handleCrop, handleRemoveCropCanvas, croppedImage } =
        useImageCrop([displayPicture, modalToggle]);
    const [selectedFileName, setSelectedFileName] = useState("");

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setDisplayPicture(URL.createObjectURL(file));
            handleOpen();
            setSelectedFileName(file.name);
        }
    };

    const handleModalClose = () => {
        handleClose();
        handleRemoveCropCanvas();
        setDisplayPicture(croppedImage ? croppedImage : initialDisplayPicture);
    };

    const handleApplyCrop = () => {
        handleCrop();
        handleModalClose();
    };

    useEffect(() => {
        if (croppedImage) updateDisplayPicture(croppedImage, selectedFileName);
    }, [croppedImage]);

    return (
        <Stack spacing={1} justifyContent="center" alignItems="center">
            <Box>
                {!croppedImage && !modalToggle && (
                    <img
                        src={displayPicture}
                        alt="Current display picture"
                        className="display-picture"
                        crossOrigin="anonymous"
                    />
                )}
                {croppedImage && (
                    <img
                        src={croppedImage}
                        alt="Cropped image"
                        className="display-picture"
                        crossOrigin="anonymous"
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
                            <CameraAltIcon/>
                        </IconButton>
                    </label>
                </>
            )}
            <DisplayPictureModal
                modalToggle={modalToggle}
                handleClose={handleModalClose}
                uploadedImage={displayPicture}
                imageRef={imageRef}
                handleApplyCrop={handleApplyCrop}
            />
        </Stack>
    );
}

export default DisplayPicture;
