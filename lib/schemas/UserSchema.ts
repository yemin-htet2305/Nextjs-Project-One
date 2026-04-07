import { z } from "zod/v4";

const UserSchema = z.object({
    email: z.email(),
    username: z.string().min(6),
    name: z.string(),
    image: z.url(),
});

export default UserSchema;
