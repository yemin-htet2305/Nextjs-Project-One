import { z } from "zod/v4";

const ToggleBookmarkActionSchema = z.object({
    questionId: z.string()
});

export default ToggleBookmarkActionSchema;
