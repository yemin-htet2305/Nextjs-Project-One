import { z } from "zod/v4";


const GetUserVoteSchema = z.object({
  type:z.enum(["question","answer"]),
  typeId: z.string()
});

export default GetUserVoteSchema;

