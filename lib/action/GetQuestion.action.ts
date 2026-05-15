"use server"
import dbConnect from "../dbConnect"
import validateBody from "../validateBody";
import { actionError     } from "../response";
import Question, {IquestionDoc} from "@/database/question.model";
import GetQuestionSchema from "../schemas/GetQuestionSchema";
import { auth } from "@/auth";
import Collection from "@/database/collection.model";
import { cache } from "react";

const GetQuestion = cache(async (
    id: string
): Promise<
{
    success: Boolean,
    data?: {question: IquestionDoc,saved: Boolean}
}>  => {
    await dbConnect();
    const auth_session = await auth();
    const userId = auth_session?.user?.id;
    try{
        if(!userId) throw new Error("Unauthorized!");
        const {questionId} = validateBody({questionId: id},GetQuestionSchema);

        const question = await Question.findById(questionId).populate("tags");
        if(!question){
            throw new Error("Question not found");
        }
        const collection = await Collection.findOne({
            author: userId,
            question: questionId
        });
        console.log("hit");
        return { success: true, data: {question:JSON.parse(JSON.stringify(question)),saved:!!collection} };
    }catch(err){
        console.log('GetQuestion error:', err);
        return actionError(err);
    }
});

export {GetQuestion};