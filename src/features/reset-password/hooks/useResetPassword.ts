"use client";

import { ResetPasswordAuth } from "@/actions/auth/resetPassword";
import supabase from "@/lib/supabase";
import {
  ResetPasswordSchemaType,
  resetPasswordSchema,
} from "@/schemas/resetPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface UseResetPasswordProps {
  forgotId: string;
}

const useResetPassword = ({ forgotId }: UseResetPasswordProps) => {
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setError,
    reset,
    watch,
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const resetState = () => {
    setSuccess(false);
    setSubmitError(null);
  };

  const submit: SubmitHandler<ResetPasswordSchemaType> = async (dataForm) => {
    try {
      resetState();
      const form = new FormData();
      form.append("newPassword", dataForm.password);
      form.append("confirmPassword", dataForm.confirmPassword);
      const res = await ResetPasswordAuth(form);
      if (res.error && res.field === "confirmPassword") {
        setError("confirmPassword", {
          message: res.error,
        });
        return;
      }
      if (res.error) throw new Error(res.error);
      const { error: errorDelete } = await supabase
        .from("forgot_password")
        .delete()
        .eq("id", forgotId);
      if (errorDelete) throw new Error(errorDelete.message);
      setSuccess(true);
      reset();
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "An error occurred while resetting your password",
      );
    }
  };

  return {
    register,
    handleSubmit,
    submit,
    errors,
    isSubmitting,
    isValid,
    success,
    submitError,
    password,
    setSuccess,
  };
};

export default useResetPassword;
