import { z } from "zod/v4";


const GetAiAnswerActionSchema = z.object({
  title: z.string(),
  content: z.string(),
  answer: z.string()
})
export default GetAiAnswerActionSchema;

