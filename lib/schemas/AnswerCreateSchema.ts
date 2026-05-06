import { z } from "zod/v4";


const AnswerCreateSchema = z.object({
  questionId: z.string(),
  content: z.string()
})
export default AnswerCreateSchema;

