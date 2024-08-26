import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  year: z.number({ required_error: "Year is required" }),
  cc: z.string().min(1, "CC must be greater than 0"),
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  description: z.string().optional(),
  pricePerHour: z.number().min(1, "Price per hour must be greater than 0"),
  image: z
    .any()
    .refine((files) => files?.[0], "Image is required")
    .refine(
      (files) => files?.[0]?.size <= 5 * 1024 * 1024,
      "Image size should be less than 5MB"
    )
    .refine(
      (files) =>
        ["image/jpeg", "image/png", "image/gif"].includes(files?.[0]?.type),
      "Only .jpg, .png, and .gif files are allowed."
    ),
});

export const updateBikeSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  year: z.number({ required_error: "Year is required" }).optional(),
  cc: z.string().min(1, "CC must be greater than 0").optional(),
  brand: z.string().min(1, "Brand is required").optional(),
  model: z.string().min(1, "Model is required").optional(),
  description: z.string().optional(),
  pricePerHour: z
    .number()
    .min(1, "Price per hour must be greater than 0")
    .optional(),
  image: z.any().optional(),
});
