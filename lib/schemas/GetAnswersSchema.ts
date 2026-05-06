import { z } from "zod/v4";


const GetAnswersSchema = z.object({
  page: z.number().int().positive().default(1),
  pageSize:z.number().int().positive().default(10),
  filter: z.string(),
  questionId: z.string()
});

export default GetAnswersSchema;

