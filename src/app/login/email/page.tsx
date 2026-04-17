import appName from "@/constants/appName";
import LoginEmailClient from "@/features/loginEmail/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${appName} - Login With Email`,
};

const LoginEmail = () => {
  return <LoginEmailClient />;
};

export default LoginEmail;
