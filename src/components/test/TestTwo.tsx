import React, { useEffect, useRef, useState } from "react";
import Cropper from "cropperjs";

function TestTwo() {
  const [modalOpen, setModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const imageRef = useRef<HTMLImageElement>(null);
  const cropperRef = useRef<Cropper>();

  const openModal = () => {
    if (imageSrc) {
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    if (cropperRef.current) {
      // Retrieve the cropped image data
      const croppedImageData = cropperRef.current
        .getCroppedCanvas()
        .toDataURL();

      // Use the cropped image data as needed (e.g., upload to server)

      // Close the modal
      closeModal();
    }
  };

  useEffect(() => {
    if (imageSrc) {
      openModal();
    }
  }, [imageSrc]);

  useEffect(() => {
    if (modalOpen && imageRef.current) {
      cropperRef.current = new Cropper(imageRef.current, {
        // CropperJS configuration options
        // Example: aspectRatio: 16 / 9,
      });
    }
    console.log("imageRef - test 2", imageRef.current);
  }, [modalOpen]);

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <p>MODAL</p>
            <div>
              <img ref={imageRef} src={imageSrc} alt="Preview" />
            </div>
            <button onClick={handleCrop}>Crop</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestTwo;
