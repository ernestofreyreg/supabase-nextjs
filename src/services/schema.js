import { z } from "zod";

export const PersonSchema = z.object({
  name: z.string().min(1, "Name is required"),
  dob: z.date(),
  email: z.string().email("Email not correct formatted"),
  address: z.string().min(1, "Address is required"),
  phone: z.string().min(1, "Phone is required"),
  country_id: z.string().min(1, "Country is required"),
  picture: z.string().min(1, "Picture is required"),
});
