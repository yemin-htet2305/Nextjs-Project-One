"use server"
import User, { IuserDoc } from "@/database/user.model";
import dbConnect from "../dbConnect";
import { actionError } from "../response";
import GetUserSchema from "../schemas/GetUserSchema";
import validateBody from "../validateBody";
import Question from "@/database/question.model";
import Answer from "@/database/answer.model";

export async function GetUser(params:{
    userId : string;
}):Promise<{
    success: Boolean,
    data?: {
        user: IuserDoc,
        questionCount: number,
        answerCount: number
    },
    message?: string,
    detail?: object | null
}>{
    await dbConnect();
    try{
        const {userId} = validateBody(params,GetUserSchema);
        const user = await User.findById(userId);

        if(!user) throw new Error("user not found!");

        const [questionCount = 0, answerCount = 0] = await Promise.all([
            Question.countDocuments({
            author: userId
        }),
            Answer.countDocuments({
            author: userId
        })
        ]);

        return{
            success:true,
            data:{
                user: JSON.parse(JSON.stringify(user)),
                questionCount,
                answerCount
            }
        };
    }catch(e){
        return actionError(e);
    }
    
}