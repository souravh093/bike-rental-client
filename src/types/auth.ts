/* eslint-disable @typescript-eslint/no-explicit-any */
import { loginSchema, signupSchema, updateSignupSchema } from "@/validation/authValidation";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";

export type TLogin = {
  email: string;
  password: string;
};

export type TRegister = {
  name: string;
  email: string;
  password: string;
  address: string;
};

export interface AuthFormFieldProps {
  name: FieldPath<z.infer<typeof loginSchema>>;
  label: string;
  placeholder: string;
  description?: string;
  inputType?: string;
  formControl: Control<z.infer<typeof loginSchema>, any>;
}

export interface UpdateUserProfile {
  name: FieldPath<z.infer<typeof updateSignupSchema>>;
  label: string;
  placeholder: string;
  description?: string;
  inputType?: string;
  required?: boolean;
  formControl: Control<z.infer<typeof updateSignupSchema>, any>;
}

export interface SignUpFormFieldProps {
  name: FieldPath<z.infer<typeof signupSchema>>;
  label: string;
  placeholder: string;
  description?: string;
  inputType?: string;
  required?: boolean;
  formControl: Control<z.infer<typeof signupSchema>, any>;
}
