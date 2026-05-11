"use server"
import Collection, { IcollectionDoc } from "@/database/collection.model";
import dbConnect from "../dbConnect";
import PaginatedSearchParamsSchema from "../schemas/PaginatdSearchParamsSchema";
import validateBody from "../validateBody";
import mongoose ,{ PipelineStage } from "mongoose";
import { auth } from "@/auth";
import { actionError } from "../response";


export async function GetBookmarkQuestions(params:{
    page? : number,
    pageSize?: number,
    search?: string,
    filter?: string,
    sort?: string
}):Promise<{
    success:Boolean;
    data?: {
        collections: IcollectionDoc[],
        isNext: Boolean
    },
    message?: string;
    detail?: object | null;
}>{
    await dbConnect();
    const auth_session = await auth();
    const userId = auth_session?.user?.id;
    if(!userId){
        return{
            success: true,
            data:{
                collections:[],isNext: false
            }
        }
    }
    
    try{
        const {page,pageSize,search,filter,sort} = validateBody(params,PaginatedSearchParamsSchema);
        const skip = (Number(page) - 1) * Number(pageSize);
        const limit = Number(pageSize);

        const sortOptions: Record<string,Record<string,1|-1>> = {
            mostrecent: { "question.createdAt": -1 },
            oldest: { "question.createdAt": 1 },
            mostvoted: { "question.upvotes": -1 },
            mostviewed: { "question.views": -1 },
            mostanswered: { "question.answers": -1 },
        }
        const sortCriteria = filter? sortOptions[filter] : sortOptions.mostrecent;

        const pipeline: PipelineStage[] = [
            {$match: {author : new mongoose.Types.ObjectId(userId)}},
            {
                $lookup:{
                    from:"questions",
                    localField:"question",
                    foreignField:"_id",
                    as:"question"
                }
            },
            {$unwind: {
            path: "$question",
            preserveNullAndEmptyArrays: true
        }},
            {
                $lookup:{
                    from:"users",
                    localField:"question.author",
                    foreignField:"_id",
                    as:"question.author"
                }
            },
            {$unwind: {
            path: "$question.author",
            preserveNullAndEmptyArrays: true
        }},
            {
                $lookup:{
                    from:"tags",
                    localField:"question.tags",
                    foreignField:"_id",
                    as:"question.tags"
                }
            }
        ];
        if(search){
            pipeline.push({
                $match: {
                    $or: [
                        {"question.title": {$regex: search, $options: "i"}},
                        {"question.content": {$regex: search, $options: "i"}}
                    ]
                }
            })
        }
        const[totalCountResults] = await Collection.aggregate([
            ...pipeline,
            {$count: "count"}
        ]);
        const totalCollections = totalCountResults?.count || 0;

        const collections = await Collection.aggregate([
            ...pipeline,
            {$sort: sortCriteria},
            {$skip: skip},
            {$limit: limit},
        ]);
        const next = totalCollections > skip + collections.length;
        return{
            success:true,
            data:{
                collections: JSON.parse(JSON.stringify(collections)),
                isNext: next
            }
        }
    }catch(e){
        return actionError(e);
    }
}