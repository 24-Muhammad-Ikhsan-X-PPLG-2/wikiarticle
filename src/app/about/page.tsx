import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import AboutWeb from "@/features/about/components/AboutWeb";
import CTA from "@/features/about/components/CTA";
import FeaturesSection from "@/features/about/components/FeaturesSection";
import Hero from "@/features/about/components/Hero";
import MissionVision from "@/features/about/components/MissionVision";
import TeamsSection from "@/features/about/components/TeamsSection";
import ValuesSection from "@/features/about/components/ValuesSection";
import { Metadata } from "next";
import appName from "../constants/appName";

export const metadata: Metadata = {
  title: `${appName} - About`,
};

const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Navbar currentPage="about" />
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
  );
};

export default About;
