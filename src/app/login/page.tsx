import LoginClient from "@/features/login/client";
import { Metadata } from "next";
import appName from "../constants/appName";

export const metadata: Metadata = {
  title: `${appName} - Login`,
};

const Login = () => {
  return <LoginClient />;
};

export default Login;
