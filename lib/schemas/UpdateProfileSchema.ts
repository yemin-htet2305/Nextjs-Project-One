import { z } from "zod/v4";

const UpdateProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  bio: z.string().optional(),
  location: z.string().optional(),
  portfolio: z.string().optional(),
  image: z.string().optional(),
});

export default UpdateProfileSchema;
