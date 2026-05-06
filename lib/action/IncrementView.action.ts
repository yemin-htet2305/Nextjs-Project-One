import Question from "@/database/question.model";
import dbConnect from "../dbConnect"
import { actionError } from "../response";
import IncrementViewSchema from "../schemas/IncrementViewSchema";
import validateBody from "../validateBody";


export async function IncrementView(params:{ questionId: string}):Promise<{
    success: boolean,
    data?: {view : number},
    message?: string,
    detail?: object | null,
}> {
    await dbConnect();
    const {questionId} = validateBody(params,IncrementViewSchema);
    try{
        const question = await Question.findById(questionId);
        if(!question) throw new Error("Question Not Found!");

        question.views += 1

        await question.save();
        return{
            success: true,
            data: { view: question.views}
        }
    }catch(e){
        return actionError(e);
    }
}