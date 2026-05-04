"use server"

import dbConnect from "../dbConnect"
import validateBody from "../validateBody";
import { actionError     } from "../response";
import Question, {IquestionDoc} from "@/database/question.model";
import GetQuestionSchema from "../schemas/GetQuestionSchema";

export async function GetQuestion(params:{
    questionId: string
}): Promise<
{
    success: boolean,
    data?: IquestionDoc
}> {
    await dbConnect();
    console.log("GetQuestion action called with params:", params);
    try{
        const {questionId} = validateBody(params,GetQuestionSchema);

        let question = await Question.findById(questionId).populate("tags");
        if(!question){
            throw new Error("Question not found");
        }

        return { success: true, data: JSON.parse(JSON.stringify(question)) };

    }catch(err){
        console.log('GetQuestion error:', err);
        return actionError(err);
    }
}