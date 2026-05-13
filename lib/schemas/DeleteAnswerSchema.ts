import {z} from "zod/v4";

const DeleteAnswerSchema = z.object({
    answerId: z.string()
});

export default DeleteAnswerSchema;