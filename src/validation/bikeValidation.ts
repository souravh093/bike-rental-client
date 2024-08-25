import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  year: z.number({ required_error: "Year is required" }),
  cc: z.number().min(1, "CC must be greater than 0"),
  brand: z.string().min(1, "Brand is required"),
  modal: z.string().min(1, "Modal is required"),
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
