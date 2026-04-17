import appName from "@/constants/appName";
import NotFoundClient from "@/features/notfound/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${appName} - Not Found`,
};

const NotFound = () => {
  return <NotFoundClient />;
};

export default NotFound;
