"use client";

import { FC, ReactNode } from "react";
import {
  Controller,
  FieldPath,
  FieldValues,
  Control, // Ganti UseFormControl jadi Control
  ControllerRenderProps,
  ControllerFieldState,
} from "react-hook-form";

// Tambahkan Generic di Interface
interface FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  control: Control<TFieldValues>; // Pakai Control<TFieldValues>
  render: (props: {
    field: ControllerRenderProps<TFieldValues, TName>;
    fieldState: ControllerFieldState;
  }) => ReactNode;
}

// Tambahkan Generic di Komponen agar tipe datanya nyambung
const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  render,
}: FormFieldProps<TFieldValues, TName>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        // Kita langsung teruskan field dan fieldState asli dari RHF
        // karena strukturnya sudah sesuai dengan yang kamu mau
        return <>{render({ field, fieldState })}</>;
      }}
    />
  );
};

export default FormField;
