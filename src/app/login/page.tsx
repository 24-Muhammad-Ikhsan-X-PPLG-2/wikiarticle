import LoginClient from "@/features/login/client";
import { Metadata } from "next";
import appName from "../../constants/appName";
import { Suspense } from "react";
import FallbackSuspense from "@/features/login/components/FallbackSuspense";

export const metadata: Metadata = {
  title: `${appName} - Login`,
};

const Login = () => {
  return (
    <Suspense fallback={<FallbackSuspense />}>
      <LoginClient />
    </Suspense>
  );
};

export default Login;
