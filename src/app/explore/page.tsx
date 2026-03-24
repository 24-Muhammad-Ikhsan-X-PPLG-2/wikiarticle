import appName from "@/constants/appName";
import ExploreClient from "@/features/explore/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${appName} - Explore Articles`,
};

const Explore = () => {
  return <ExploreClient />;
};

export default Explore;
