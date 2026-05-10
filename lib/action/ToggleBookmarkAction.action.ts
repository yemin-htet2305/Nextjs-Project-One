'use server'
import { auth } from "@/auth";
import dbConnect from "../dbConnect"
import validateBody from "../validateBody";
import ToggleBookmarkActionSchema from "../schemas/ToggleBookmarkActionSchema";
import { actionError } from "../response";
import Question from "@/database/question.model";
import Collection from "@/database/collection.model";

export async function ToggleBookmarkAction(params:{
    questionId: string
}):Promise<{
    success: Boolean;
    data?: {
        saved: Boolean;
    };
    message?: string;
    detail?: object | null;
}>{
    await dbConnect();
    const auth_session = await auth();
    const userId = auth_session?.user?.id;
    try{
        if(!userId) throw new Error("Unauthorized!");
        
        const {questionId} = validateBody(params,ToggleBookmarkActionSchema);
        const question = await Question.findById(questionId);
        if(!question) throw new Error("Question not found!");

        const collection = await Collection.findOne({
            author: userId,
            question: questionId
        });
        if(collection){
            await Collection.findByIdAndDelete(collection._id);
            return{
                success:true,
                data: {
                    saved: false
                }
            };
        }
        await Collection.create({
            author: userId,
            question: questionId
        });
        return{
                success:true,
                data: {
                    saved: true
                }
            };
        
    }catch(e){
        return actionError(e);
    }

}