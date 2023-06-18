import { useEffect, useRef, useState } from "react";
import Cropper from "cropperjs";

function useImageCrop(dependencies: any[]) {
  const imageRef = useRef<HTMLImageElement | null>(null);
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
  }, [imageRef, cropperRef, ...dependencies]);

  const handleCrop = () => {
    const cropperData = cropperRef?.current?.getData();
    const canvas = cropperRef?.current?.getCroppedCanvas(cropperData);
    const croppedImageDataURL = canvas?.toDataURL();

    if (croppedImageDataURL) setCroppedImage(croppedImageDataURL);
    handleRemoveCropCanvas();
  };

  const handleRemoveCropCanvas = () => {
    cropperRef?.current?.destroy(); // Destroy the Cropper.js instance
    imageRef.current?.classList.add("hidden"); // Add a CSS class to hide the image
  };

  return { imageRef, handleCrop, handleRemoveCropCanvas, croppedImage };
}

export default useImageCrop;
