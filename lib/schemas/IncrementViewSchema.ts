import { z } from "zod/v4";


const IncrementViewSchema = z.object({
  questionId: z.string()
})
export default IncrementViewSchema;

