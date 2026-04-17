"use client";

import { ForgotPasswordAuth } from "@/actions/auth/forgotPassword";
import supabase from "@/lib/supabase";
import { forgotSchema, ForgotSchemaType } from "@/schemas/forgotSchema";
import { createClient } from "@/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostgrestMaybeSingleResponse } from "@supabase/supabase-js";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const useForgot = () => {
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [canResend, setCanResend] = useState(true);
  const [resendCountdown, setResendCountdown] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<ForgotSchemaType>({
    resolver: zodResolver(forgotSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const resetState = () => {
    setSuccess(false);
    setSubmitError(null);
  };

  const submit: SubmitHandler<ForgotSchemaType> = async (dataForm) => {
    try {
      resetState();
      const res = await ForgotPasswordAuth();

      if (!res.success) {
        setSubmitError(
          res.error ?? "Failed to send reset link. Please try again.",
        );
        return;
      }

      const { data: checkUser } = (await supabase
        .from("profiles")
        .select("id")
        .eq("email", dataForm.email)
        .maybeSingle()) as PostgrestMaybeSingleResponse<{ id: string }>;
      if (checkUser) {
        const { error: errorResetPassword } = await sendEmailForgotPassword(
          checkUser.id,
          dataForm.email,
        );
        if (errorResetPassword) {
          setSubmitError(
            res.error ?? "Failed to send reset link. Please try again.",
          );
          return;
        }
      }

      setSuccess(true);
      setCanResend(false);
      setResendCountdown(60);

      // Start countdown
      const interval = setInterval(() => {
        setResendCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      reset();
    } catch (e: any) {
      setSuccess(false);
      setSubmitError(e.message || "Unexpected error, please try again later.");
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
    canResend,
    resendCountdown,
    resetState,
  };
};

async function sendEmailForgotPassword(user_id: string, email: string) {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
  const { error: errorForgotPassword, data: dataForgotPassword } =
    await supabase
      .from("forgot_password")
      .insert({
        user_id,
        expires_at: expiresAt,
      })
      .select("id")
      .maybeSingle();
  if (errorForgotPassword) throw new Error(errorForgotPassword.message);

  const { error: errorResetPassword } =
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback?next=/reset-password/${dataForgotPassword?.id}`,
    });

  if (errorResetPassword)
    return {
      error: errorResetPassword.message,
    };
  return {
    error: null,
  };
}

export default useForgot;
