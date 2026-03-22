"use client";

import { LoginAuth } from "@/actions/login";
import { loginSchema, LoginSchemaType } from "@/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const useLogin = () => {
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setError,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });
  const resetState = () => {
    setSuccess(false);
    setSubmitError(null);
  };
  const submit: SubmitHandler<LoginSchemaType> = async (dataForm) => {
    try {
      resetState();
      const formData = new FormData();
      formData.append("email", dataForm.email);
      formData.append("password", dataForm.password);
      formData.append("rememberMe", dataForm.rememberMe ? "on" : "");
      const res = await LoginAuth(formData);
      if (!res.success) {
        if (res.error === "Invalid login credentials") {
          setError("email", {
            message: "Invalid email or password!",
          });
          setError("password", {
            message: "Invalid email or password!",
          });
          return;
        }
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setSubmitError(res.error ?? "Unexpected error, try again later.");
        throw new Error(res.error ?? "");
      }
      setSuccess(true);
      router.push("/");
    } catch (e: any) {
      setSuccess(false);
      console.error(e.message);
    }
  };
  return {
    register,
    submitError,
    handleSubmit,
    errors,
    submit,
    success,
    isSubmitting,
    isValid,
  };
};

export default useLogin;
