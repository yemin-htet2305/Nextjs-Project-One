import { z } from "zod/v4";

const SignUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(6, "Username must be at least 6 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default SignUpSchema;
