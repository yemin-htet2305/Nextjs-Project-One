'use server';

import Tag,{ItagDoc} from "@/database/tag.model";
import dbConnect from "../dbConnect";
import validateBody from "../validateBody";
import PaginatedSearchParamsSchema from "../schemas/PaginatdSearchParamsSchema";
import { FilterQuery } from "mongoose";
import { actionError } from "../response";


export async function GetTags(params:{
    page? : number,
    pageSize?: number,
    search?: string,
    filter?: string,
    sort?: string
}): Promise<{
    data?:{
        tags: ItagDoc[],
        isNext: boolean,
    },success: boolean,
    message?: string,
    details?: object | null
}> {
    await dbConnect();

    const {page,pageSize,search,filter,sort} = validateBody(params,PaginatedSearchParamsSchema)
    
    const skip = (Number(page) - 1) * Number(pageSize)
    const limit = Number(pageSize)

    const filterQuery: FilterQuery<ItagDoc> = {}

    if(filter === "recommended"){
        return {data:{tags: [],isNext: false},success:true,}
    }
    if(search){
        filterQuery.$or = [
            {name : {$regex: new RegExp(search,'i')}},
        ]
    }

    let sortCrietria = {}

    switch (filter){
        case "popular":
            sortCrietria = {questions: -1}
        case "newest":
            sortCrietria = {createdAt: -1}
            break;
        case "oldest":
            sortCrietria = {createdAt: 1}
            break;
        default:
            sortCrietria = {questions: -1}
            break;
    }
    try{
        const totalTags = await Tag.countDocuments();
        const tags = await Tag.find(filterQuery)
                                        .sort(sortCrietria)
                                        .skip(skip)
                                        .limit(limit)
                                        .lean<ItagDoc[]>();

        const next = totalTags > skip + tags.length

        return {success: true,data: {tags: tags,isNext: next}}

    }catch(e){
        return actionError(e);
    }
}