"use server"
import { auth } from "@/auth";
import dbConnect from "../dbConnect"
import QuestionCreateSchema from "../schemas/QuestionCreateSchema";
import validateBody from "../validateBody";
import mongoose from "mongoose";
import { actionError } from "../response";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import TagQuestion from "@/database/tag-question.model";
import QuestionEditSchema from "../schemas/QuestionEditSchema";

export async function QuestionCreate(params:{
    questionId: string,
    title: string,
    content: string,
    tags : string[]
}): Promise<
{
    success: boolean,
    data?: {
        _id: string,
        title: string,
        author:string,
        content: string,
        tags: string[]
    }
}> {
    await dbConnect();
    
    const auth_session = await auth();
    const userId = auth_session?.user?.id;

    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const {questionId, title, content, tags} = validateBody(params, QuestionEditSchema);

        let question = await Question.findById(questionId).populate('tags').session(session);
        if(!question) throw new Error('question not found');

        if (question.title !== title || question.content !== content) {
            question.title = title;
            question.content = content;
            await question.save({session});
        }

        await session.commitTransaction();
        return { success: true, data: JSON.parse(JSON.stringify(question)) };

    }catch(err){
        await session.abortTransaction();
        return actionError(err);
    }finally{
        session.endSession();
    }
}