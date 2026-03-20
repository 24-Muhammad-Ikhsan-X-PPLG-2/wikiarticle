import { Metadata } from "next";
import appName from "../constants/appName";
import RegisterClient from "@/features/register/client";

export const metadata: Metadata = {
  title: `${appName} - Register`,
};

const Register = () => {
  return <RegisterClient />;
};

export default Register;
