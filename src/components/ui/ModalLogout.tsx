"use client";

import { LogoutAuth } from "@/actions/auth/logout";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useRef } from "react";

type Props = {
  showModal: boolean;
  onClose: () => void;
  username?: string;
};

const ModalLogout: FC<Props> = ({ onClose, showModal, username = "User" }) => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const handleLogout = async () => {
    await LogoutAuth();
    onClose();
    router.push("/login");
  };
  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    window.addEventListener("mousedown", clickOutside);
    return () => window.removeEventListener("mousedown", clickOutside);
  }, []);
  return (
    <AnimatePresence mode="wait">
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed z-999 w-full h-full flex justify-center items-center bg-black/50"
        >
          <div
            ref={containerRef}
            className="bg-white relative dark:bg-gray-900 rounded-md w-100 overflow-hidden h-fit p-5"
          >
            <div className="dark:bg-gray-200 bg-gray-900 absolute bottom-0 right-0 size-17 z-0 blur-[100px]"></div>
            <div className="flex mb-3 justify-between items-center">
              <h1 className="font-bold text-lg">Sign Out</h1>
              <X onClick={onClose} className="size-6 cursor-pointer" />
            </div>
            <div className="mb-5">
              <p>Ready to sign off, {username}?</p>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-3 py-2 rounded-md font-medium transition duration-200 cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-300"
              >
                Wait, I'm staying
              </button>
              <button
                onClick={handleLogout}
                className="px-5 relative z-1 py-2 hover:-translate-y-1 transition duration-200 rounded-md font-medium cursor-pointer bg-red-600/15 border border-red-600/40 dark:text-red-400 text-red-500"
              >
                Sign me off
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalLogout;
