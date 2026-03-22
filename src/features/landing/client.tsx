"use client";

import Navbar from "@/components/layout/Navbar";
import Hero from "./components/Hero";
import FeaturesSection from "./components/FeaturesSection";
import HowItWorks from "./components/HowItWorks";
import PopularArticles from "./components/PopularArticles";
import CTA from "./components/CTA";
import Footer from "@/components/layout/Footer";
import { User } from "@supabase/supabase-js";
import { FC } from "react";
import useModalLogout from "./hooks/useModalLogout";
import ModalLogout from "./components/ModalLogout";
import { ProfileDB } from "@/supabase/dbTypes/profileDB";

type Props = {
  user: User | null;
  profile: ProfileDB | null;
};

const Landing: FC<Props> = ({ user, profile }) => {
  const { handleClose, handleOpen, showModalLogout } = useModalLogout();
  return (
    <>
      <ModalLogout
        username={profile?.username}
        showModal={showModalLogout}
        onClose={handleClose}
      />
      <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
        <Navbar
          handleLogout={handleOpen}
          isUserLoggedIn={user ? true : false}
        />
        <main className="pt-16">
          <Hero />
          <FeaturesSection />
          <HowItWorks />
          <PopularArticles />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Landing;
