import {z} from "zod/v4"

const VoteActionSchema = z.object({
    type: z.enum(["question","answer"]),
    typeId: z.string(),
    voteType: z.enum(['upvote','downvote'])
})

export default VoteActionSchema;