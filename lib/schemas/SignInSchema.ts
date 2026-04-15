import { z } from "zod/v4";

const SignInSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default SignInSchema;

