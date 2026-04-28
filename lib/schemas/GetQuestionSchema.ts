import { z } from "zod/v4";


const GetQuestionSchema = z.object({
  questionId: z.string()
});

export default GetQuestionSchema;

