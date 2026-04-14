"use client";

import Navbar from "@/components/layout/Navbar";
import Hero from "./components/Hero";
import MissionVision from "./components/MissionVision";
import AboutWeb from "./components/AboutWeb";
import FeaturesSection from "./components/FeaturesSection";
import TeamsSection from "./components/TeamsSection";
import ValuesSection from "./components/ValuesSection";
import CTA from "./components/CTA";
import Footer from "@/components/layout/Footer";
import useModalLogout from "../../hooks/useModalLogout";
import ModalLogout from "../../components/ui/ModalLogout";

const AboutClient = () => {
  const { handleClose, handleOpen, showModalLogout, userInfo } =
    useModalLogout();
  return (
    <>
      <ModalLogout
        onClose={handleClose}
        showModal={showModalLogout}
        username={userInfo?.profile?.username}
      />
      <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
        <Navbar currentPage="about" showStatusLogin handleLogout={handleOpen} />
        <main className="pt-16">
          {/* Hero Section */}
          <Hero />

          {/* Mission & Vision Section */}
          <MissionVision />

          {/* What is WikiArticle Section */}
          <AboutWeb />

          {/* Features Section */}
          <FeaturesSection />

          {/* Team Section */}
          <TeamsSection />

          {/* Values Section */}
          <ValuesSection />

          {/* CTA Section */}
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AboutClient;
