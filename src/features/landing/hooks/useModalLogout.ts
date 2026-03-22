"use client";

import { useState } from "react";

const useModalLogout = () => {
  const [showModalLogout, setShowModalLogout] = useState(false);
  const toggleScroll = () =>
    document.body.classList.toggle("overflow-y-hidden");
  const handleClose = () => {
    toggleScroll();
    setShowModalLogout(false);
  };
  const handleOpen = () => {
    toggleScroll();
    setShowModalLogout(true);
  };
  const toggleModal = () => {
    toggleScroll();
    setShowModalLogout((prev) => !prev);
  };
  return {
    showModalLogout,
    handleClose,
    handleOpen,
    toggleModal,
  };
};

export default useModalLogout;
