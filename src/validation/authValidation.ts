import { z } from "zod";

export const loginSchema = z.object({
  email: z.string({ required_error: "Email is Required" }).email(),
  password: z.string({ required_error: "Password is Required" }).min(8).max(16),
});

export const signupSchema = z.object({
  name: z.string({ required_error: "Name is Required" }),
  email: z.string({ required_error: "Email is required" }).email(),
  password: z.string({ required_error: "Password is required" }).min(8).max(16),
  phone: z.string({ required_error: "Phone is required" }),
  address: z.string({ required_error: "Address is required" }),
});
export const updateSignupSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});
