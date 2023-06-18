import { useEffect, useRef, useState } from "react";
import Cropper from "cropperjs";

function useImageCrop(uploadedImage: string) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const cropperRef = useRef<Cropper | null>(null);

  useEffect(() => {
    if (imageRef.current)
      cropperRef.current = new Cropper(imageRef.current, {
        aspectRatio: 1,
        dragMode: "move",
        viewMode: 3,
        cropBoxResizable: false,
      });

    return () => {
      if (cropperRef.current) cropperRef.current.destroy();
    };
  }, [imageRef, cropperRef, uploadedImage]);

  const handleCrop = () => {
    const cropperData = cropperRef?.current?.getData();
    const canvas = cropperRef?.current?.getCroppedCanvas(cropperData);
    const croppedImageDataURL = canvas?.toDataURL();

    if (croppedImageDataURL) setCroppedImage(croppedImageDataURL);

    cropperRef?.current?.destroy(); // Destroy the Cropper.js instance
    imageRef.current?.classList.add("hidden"); // Add a CSS class to hide the image
  };

  return { imageRef, handleCrop, croppedImage };
}

export default useImageCrop;
