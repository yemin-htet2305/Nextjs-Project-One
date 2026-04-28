import { z } from "zod/v4";

const QuestionCreateSchema = z.object({
questionId: z.string(),
  title: z.string().min(5, "Title must be at least 5 characters").max(200, "Title must be at most 200 characters"),
  content: z.string().min(5, "Content must be at least 5 characters").max(1000, "Content must be at most 1000 characters"),
  tags: z.array(z.string().min(2, "Tag must be at least 2 characters").max(50, "Tag must be at most 50 characters")).min(1, "At least one tag is required")
});

export default QuestionCreateSchema;

