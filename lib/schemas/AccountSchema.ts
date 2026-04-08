import {z} from "zod/v4";

const AccountSchema = z.object({
    userId: z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
        message: "userId must be a valid MongoDB ObjectId"
    }),
    name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
    image: z.string().url("Invalid image URL").optional(),
    password: z.string().min(6, "Password must be at least 6 characters").optional(),
    provider: z.string().min(1, "Provider is required"),
    providerAccountId: z.string().min(1, "Provider account ID is required"),
}).strict();

export default AccountSchema;