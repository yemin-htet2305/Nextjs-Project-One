"use server";

import Tag, { ItagDoc } from "@/database/tag.model";
import dbConnect from "../dbConnect";
import GetTagQuestionsSchema from "../schemas/GetTagQuestionsSchema";
import validateBody from "../validateBody";
import { FilterQuery } from "mongoose";
import Question, { IquestionDoc } from "@/database/question.model";
import { actionError } from "../response";

export async function GetTagQuestions(params:{
     page? : number,
    pageSize?: number,
    search?: string,
    sort?: string,
    tagId: string,
}):Promise<{
    success: Boolean,
    data?: {
        tag: ItagDoc,
        questions: IquestionDoc[],
        isNext: Boolean
    },
    message?: string,
    detail?: object | null,
}>{
    await dbConnect();

    const{page,pageSize,sort,search,tagId} = validateBody(params,GetTagQuestionsSchema);
    const skip = (Number(page) - 1) * Number(pageSize)
    const limit = Number(pageSize)

    try{
        const tag = await Tag.findById(tagId);
        if(!tag){
            throw new Error("Tag not found!");
        }
        const filterQuery: FilterQuery<typeof Question> = {
            tags :{$in : [tagId]}
        }
        if(search){
            filterQuery.title = {$regex: search,$option: "i"}
        }
        const totalquestions = await Question.countDocuments(filterQuery)
        const questions = await Question.find(filterQuery)
                            .select("_id title views answers upvotes downvotes author createdAt")
                            .populate("author","name image")
                            .populate("tags","name")
                            .skip(skip)
                            .limit(limit)
                            .lean<IquestionDoc[]>()
        const isNext = totalquestions > skip + questions.length        
        return {success: true, data:{tag: JSON.parse(JSON.stringify(tag)),questions: questions, isNext: isNext}}

    }catch(e){
        return actionError(e);
    }
}