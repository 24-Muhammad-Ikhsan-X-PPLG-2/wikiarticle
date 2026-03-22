"use client";

import { RegisterAuth } from "@/actions/register";
import { registerSchema, RegisterSchemaType } from "@/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const useRegister = () => {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      confirmPassword: "",
      email: "",
      username: "",
      password: "",
      birthDate: "",
    },
  });
  const resetState = () => {
    setSuccess(false);
    setSubmitError(null);
  };
  const submit: SubmitHandler<RegisterSchemaType> = async ({
    birthDate,
    confirmPassword,
    email,
    password,
    terms,
    username,
  }) => {
    try {
      resetState();
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("username", username);
      formData.append("terms", terms ? "on" : "");
      formData.append("confirmPassword", confirmPassword);
      formData.append("birthDate", birthDate);
      const res = await RegisterAuth(formData);
      if (!res.success && res.error) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setSubmitError(res.error ?? "Unexpected error, try again later.");
        throw new Error(res.error);
      }
      setSuccess(true);
      reset();
      router.push("/login?regSuccess=true");
    } catch (e: any) {
      setSuccess(false);
      console.error(e.message);
    }
  };
  return {
    register,
    handleSubmit,
    errors,
    submit,
    success,
    isSubmitting,
    isValid,
    submitError,
  };
};

export default useRegister;
