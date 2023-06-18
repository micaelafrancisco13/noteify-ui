import { useState } from "react";

function useModal() {
  const [modalToggle, setModalToggle] = useState(false);

  const handleOpen = () => {
    setModalToggle(true);
  };

  const handleClose = () => {
    setModalToggle(false);
  };

  return { modalToggle, handleOpen, handleClose };
}

export default useModal;
