'use server';

import Question, { IquestionDoc } from "@/database/question.model";
import dbConnect from "../dbConnect";
import validateBody from "../validateBody";
import PaginatedSearchParamsSchema from "../schemas/PaginatdSearchParamsSchema";
import { QueryFilter } from "mongoose";
import { actionError } from "../response";


export async function GetQuestions(params:{
    page? : number,
    pageSize?: number,
    search?: string,
    filter?: string,
    sort?: string
}): Promise<{
    data?:{
        questions: IquestionDoc[],
        isNext: Boolean,
    },success: Boolean,
    message?: string,
    details?: object | null
}> {
    await dbConnect();

    const {page,pageSize,search,filter,sort} = validateBody(params,PaginatedSearchParamsSchema)
    
    const skip = (Number(page) - 1) * Number(pageSize)
    const limit = Number(pageSize)

    const filterQuery: QueryFilter<IquestionDoc> = {}

    if(filter === "recommended"){
        return {data:{questions: [],isNext: false},success:true,}
    }
    if(search){
        filterQuery.$or = [
            {title : {$regex: new RegExp(search,'i')}},
            {content : {$regex: new RegExp(search,'i')}}
        ]
    }

    let sortCrietria = {}

    switch (filter){
        case "newest":
            sortCrietria = {createdAt: -1}
            break;
        case "unanswered":
            filterQuery.answers = 0;
            sortCrietria = {createdAt: -1}
            break;
        case "popular":
            sortCrietria = {upvotes: -1}
            break;
        default:
            sortCrietria = {createdAt: -1}
            break;
    }
    try{
        const totalQuestions = await Question.countDocuments();
        const questions = await Question.find(filterQuery)
                                        .populate("tags","name")
                                        .populate("author","_id name image")
                                        .sort(sortCrietria)
                                        .skip(skip)
                                        .limit(limit)
                                        .lean<IquestionDoc[]>();

        const next = totalQuestions > skip + questions.length

        return {success: true,data: {questions: questions,isNext: next}}

    }catch(e){
        return actionError(e);
    }
}