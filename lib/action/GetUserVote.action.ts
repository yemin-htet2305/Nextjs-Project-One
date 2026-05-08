'use server'

import { auth } from "@/auth";
import dbConnect from "../dbConnect";
import GetUserVoteSchema from "../schemas/GetUserVoteSchema";
import validateBody from "../validateBody";
import Question from "@/database/question.model";
import Answer from '@/database/answer.model';
import Vote from "@/database/vote.model";
import { actionError } from "../response";

export async function GetUserVote(params:{
    type: "question" | "answer";
    typeId: string;
}):Promise<{
    success:Boolean,
    data?:{
        userVoteType: "upvote"|"downvote"|null;
    },
    message?: string,
    detail?: object | null

}>{
    await dbConnect();
    const auth_session = await auth();
    const user = auth_session?.user;
    const userId = user?.id;
    try{
        const {type,typeId} = validateBody(params,GetUserVoteSchema);
        if(!user) throw new Error("Unauthorized");

        const Model = type === "question"? Question:Answer;
        const item = await Model.findById(typeId);

        if(!item) throw new Error("Item not found");

        const vote = await Vote.findOne({
            author: userId,
            type_id: typeId
        });
        return {
            success: true,
            data: {
                userVoteType: vote? vote.voteType : null
            }
        };

    }catch(e){
        return actionError(e);
    }

}