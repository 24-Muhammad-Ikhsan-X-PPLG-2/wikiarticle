import appName from "@/constants/appName";
import ForgotClient from "@/features/forgot/client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${appName} - Forgot Password`,
};

const Forgot = () => {
  return <ForgotClient />;
};

export default Forgot;
