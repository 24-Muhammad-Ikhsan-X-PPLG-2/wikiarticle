"use client";

import { getUserSupabase } from "@/lib/getUserSupabase";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useUserProfile from "./useUserProfile";

const useModalLogout = () => {
  const [showModalLogout, setShowModalLogout] = useState(false);
  const { isPending, userInfo } = useUserProfile();
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
    userInfo,
    isPending,
  };
};

export default useModalLogout;
