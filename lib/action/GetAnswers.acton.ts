'use server';
import Question from "@/database/question.model";
import dbConnect from "../dbConnect";
import { actionError } from "../response";
import GetAnswersSchema from "../schemas/GetAnswersSchema";
import validateBody from "../validateBody";
import Answer, { IanswerDoc } from "@/database/answer.model";


export async function GetAnswers(params: {
    page: number,
    pageSize: number,
    filter: string,
    questionId: string
}): Promise<{
    success: boolean;
    data? : {
        answers: IanswerDoc[],
        totalAnswers: number,
        isNext: boolean
    };
    message?: string;
    detail?: object | null;
}>{
    await dbConnect();
    const{page = 1,pageSize = 10,filter,questionId} = validateBody(params,GetAnswersSchema);
    const skip = (Number(page)-1) * Number(pageSize);
    const limit = Number(pageSize);

    let sortCriteria = {};
    switch(filter){
        case 'latest':
            sortCriteria = {createdAt: -1};
            break;
        case 'oldest':
            sortCriteria = {createdAt: 1};
            break;
        case 'popular':
            sortCriteria = {upvotes: -1};
            break;
        default:
             sortCriteria = {createdAt: -1};
            break;
    }

    try{
        const question = await Question.findById(questionId);
        if(!question) throw new Error("Question Not Found!");

        const totalAnswers = await Answer.countDocuments({question:questionId});

        const answers = await Answer.find({question: questionId})
                                    .populate('author', "name image")
                                    .skip(skip)
                                    .limit(limit)
                                    .sort(sortCriteria)
                                    .lean<IanswerDoc[]>();
        
        const next = totalAnswers > (skip + answers.length);

        return {
            success: true,
            data: {
                answers: answers,
                totalAnswers: totalAnswers,
                isNext: next
            }
        }

    }catch (e){
        return actionError(e);
    }

}