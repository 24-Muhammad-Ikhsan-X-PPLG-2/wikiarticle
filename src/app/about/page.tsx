import { Metadata } from "next";
import appName from "../../constants/appName";
import AboutClient from "@/features/about/client";

export const metadata: Metadata = {
  title: `${appName} - About`,
};

const About = () => {
  return <AboutClient />;
};

export default About;
