"use client";

import { SendMagicLink } from "@/actions/auth/loginEmail";
import {
  loginEmailSchema,
  LoginEmailSchemaType,
} from "@/schemas/loginEmailSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const useLoginEmail = () => {
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [sentEmail, setSentEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch,
    reset,
  } = useForm<LoginEmailSchemaType>({
    resolver: zodResolver(loginEmailSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const emailValue = watch("email");

  // Cooldown timer for resend
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const resetState = () => {
    setSubmitError(null);
  };

  const submit: SubmitHandler<LoginEmailSchemaType> = async (dataForm) => {
    try {
      resetState();

      // Call server action to send magic link
      const form = new FormData();
      form.set("email", dataForm.email);
      const res = await SendMagicLink(form);

      if (!res.success) {
        setSubmitError(res.error ?? "Failed to send login link");
        return;
      }

      setSuccess(true);
      setSentEmail(dataForm.email);
      setResendCooldown(60); // 60 second cooldown
      reset();
    } catch (e: any) {
      setSuccess(false);
      setSubmitError(
        e.message || "Something went wrong. Please try again later.",
      );
      console.error("Login email error:", e.message);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0 || !sentEmail) return;

    try {
      resetState();

      // Call server action to resend magic link
      const form = new FormData();
      form.set("email", sentEmail);
      const res = await SendMagicLink(form);

      if (!res.success) {
        setSubmitError(res.error ?? "Failed to resend login link");
        return;
      }
    } catch (e: any) {
      setSubmitError(e.message || "Failed to resend. Please try again.");
      console.error("Resend error:", e.message);
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
    resendCooldown,
    sentEmail,
    handleResend,
    emailValue,
  };
};

export default useLoginEmail;
