import Hero from "@/features/landing/components/Hero";
import Navbar from "@/components/layout/Navbar";
import FeaturesSection from "@/features/landing/components/FeaturesSection";
import HowItWorks from "@/features/landing/components/HowItWorks";
import PopularArticles from "@/features/landing/components/PopularArticles";
import CTA from "@/features/landing/components/CTA";
import Footer from "@/components/layout/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <FeaturesSection />
        <HowItWorks />
        <PopularArticles />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
