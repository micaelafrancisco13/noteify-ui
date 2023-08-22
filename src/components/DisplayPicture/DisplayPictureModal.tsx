import { Box, Dialog, DialogTitle, IconButton, Stack } from "@mui/material";
import CustomButton from "../custom/CustomButton.tsx";
import { RefObject } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
    modalToggle: boolean;
    handleClose: () => void;
    uploadedImage: string;
    imageRef: RefObject<HTMLImageElement>;
    handleApplyCrop: () => void;
}

function DisplayPictureModal({
                                 modalToggle,
                                 handleClose,
                                 uploadedImage,
                                 imageRef,
                                 handleApplyCrop,
                             }: Props) {
    return (
        <Dialog
            keepMounted={true}
            open={modalToggle}
            onClose={handleClose}
            PaperProps={{
                sx: {
                    minWidth: "250px",
                    maxWidth: "600px",
                    maxHeight: "97.5vh",
                    background: "#000",
                    borderRadius: 3,
                },
            }}
        >
            <Stack
                direction="row"
                alignItems="center"
                spacing={0}
                sx={{
                    paddingY: 1,
                    paddingRight: 2,
                    paddingLeft: 1,
                }}
            >
                <IconButton
                    aria-label="Cancel update of display picture"
                    sx={{ color: "simple_white" }}
                    component="span"
                    onClick={handleClose}
                >
                    <CloseIcon/>
                </IconButton>
                <DialogTitle
                    sx={{
                        fontWeight: "700",
                        display: { xs: "none", sm: "block" },
                    }}
                >
                    Update display picture
                </DialogTitle>
                <Box sx={{ textAlign: "right", width: "100%" }}>
                    <CustomButton
                        onClick={handleApplyCrop}
                        variant="contained"
                        color="simple_white"
                        sx={{
                            textTransform: "none",
                            fontWeight: "700",
                            paddingY: 1,
                            borderRadius: "32px",
                        }}
                    >
                        Apply
                    </CustomButton>
                </Box>
            </Stack>
            <img
                ref={imageRef}
                src={uploadedImage}
                // src={Me}
                alt="Image to crop"
            />
            <Box sx={{ minHeight: "53px" }}/>
        </Dialog>
    );
}

export default DisplayPictureModal;
