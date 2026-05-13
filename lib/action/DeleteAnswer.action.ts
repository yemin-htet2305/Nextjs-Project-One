"use server"

import { auth } from "@/auth";
import mongoose from "mongoose";
import dbConnect from "../dbConnect";
import validateBody from "../validateBody";
import DeleteAnswerSchema from "../schemas/DeleteAnswerSchema";
import { actionError } from "../response";
import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import Vote from "@/database/vote.model";
import { revalidatePath } from "next/cache";
import ROUTES from "@/route";

export async function DeleteAnswer(params: {
    answerId : string
}):Promise<{
    success: Boolean;
    message?: string;
    detail?: object | null;
}>{
    await dbConnect();
    const auth_session = await auth();
    const user = auth_session?.user;
    const session = await mongoose.startSession();

    try{
        session.startTransaction();
        const {answerId} = validateBody(params,DeleteAnswerSchema);

        const answer = await Answer.findById(answerId).session(session);
        if(!answer) throw new Error("answer not found!");

        if(user?.id !== answer?.author.toString()) throw new Error("user not authorized!");

        await Question.findByIdAndUpdate(answer.question,
            {$inc: {answers: -1}},
            {new: true}
        ).session(session);

        await Vote.deleteMany({
            type:"answer",
            type_id: answerId
        }).session(session);
        await Answer.findByIdAndDelete(answerId);

        await session.commitTransaction();
        revalidatePath(ROUTES.PROFILE(user?.id?.toString() || ROUTES.HOME));
        return{
            success:true
        }
    }catch(e){
        await session.abortTransaction();
        return actionError(e);
    }finally{
        await session.endSession();
    }
}