import { z } from "zod/v4";

const SignInWithOauthSchema = z.object({
  provider: z.enum(["google", "github"], {
    message: "Provider must be either 'google' or 'github'",
  }),
  providerAccountId: z.string().min(1, "Provider account ID is required"),
  user: z.object({
    email: z.email("Invalid email address"),
    username: z.string().min(6, "Username must be at least 6 characters"),
    name: z.string().min(1, "Name is required"),
    image: z.url("Invalid image URL").optional(),
  }),
});

export default SignInWithOauthSchema;
