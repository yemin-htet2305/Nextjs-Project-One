import {z} from "zod/v4";

const DeleteQuestionSchema = z.object({
    questionId: z.string()
});

export default DeleteQuestionSchema;