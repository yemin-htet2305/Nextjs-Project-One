'use server'
import { auth } from "@/auth";
import dbConnect from "../dbConnect";
import AnswerCreateSchema from "../schemas/AnswerCreateSchema";
import validateBody from "../validateBody";
import mongoose from "mongoose";
import Question from "@/database/question.model";
import Answer, { IanswerDoc } from "@/database/answer.model";
import { actionError } from "../response";

export async function AnswerCreate(params:{
    questionId: string;
    content: string
}):Promise<{
    success: Boolean,
    data?: {
        answer: IanswerDoc
    },
    message?: string,
    detail?: object | null
}>{
    await dbConnect();
    const auth_session  = await auth();
    const userId = auth_session?.user?.id;
    const session = await mongoose.startSession()
    session.startTransaction();

    try{
        const {questionId,content} = validateBody(params,AnswerCreateSchema);
        const question = await Question.findById(questionId);
        if(!question) throw new Error('Question not found!');

        const [newAnswer] = await Answer.create([
            {
                author : userId,
                question: questionId,
                content
            }
        ],{session});

        question.answers += 1;
        await question.save({session});
        await session.commitTransaction();

        return {
            success: true,
            data: {
                answer: JSON.parse(JSON.stringify(newAnswer))
            }
        }
    }catch(e){
        session.abortTransaction();
        return actionError(e);
    }finally{
        await session.endSession();
    }


}