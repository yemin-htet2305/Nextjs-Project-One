import { z } from "zod/v4";


const GetUserSchema = z.object({
  userId: z.string(),
});

export default GetUserSchema;

