"use server"

import Collection, { IcollectionDoc } from "@/database/collection.model";
import dbConnect from "../dbConnect";
import PaginatedSearchParamsSchema from "../schemas/PaginatdSearchParamsSchema";
import validateBody from "../validateBody";
import { FilterQuery } from "mongoose";
import { auth } from "@/auth";
import Question from "@/database/question.model";
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
    
    try{
        if(!userId) throw new Error("Unauthorized!");
        const {page,pageSize,search,filter,sort} = validateBody(params,PaginatedSearchParamsSchema);
        
        const skip = (Number(page) - 1) * Number(pageSize);
        const limit = Number(pageSize);

        const filterQuery: FilterQuery<IcollectionDoc> = {author: userId};

            if(search){
                const matchQuestions = await Question.find({
                    $or: [
                        {title:{$regex: search,option: "i"}},
                        {content:{$regex: search,option: "i"}}
                    ]
                }).select("_id");
                const matchIds = matchQuestions.map((m)=> m._id);
                if(!matchIds.length){
                    return{
                        success:true,
                        data: {collections: [],isNext:false}
                    }
                }
                filterQuery.question = {$in: matchIds};
            }

            let sortCriteria = {}

            switch (filter){
                case "mostrecent":
                    sortCriteria = {createdAt: -1};
                    break;
                case "oldest":
                    sortCriteria = {createdAt: 1};
                    break;
                case "mostvoted":
                    sortCriteria = {upvotes: -1};
                    break;
                case "mostanswered":
                    sortCriteria = {answers: -1};
                default:
                    sortCriteria = {createdAt: -1}
                    break;
            }

        const totalCollections = await Collection.countDocuments(filterQuery);
        const collections = await Collection.find(filterQuery)
                                            .populate({
                                                path: "question",
                                                populate: [
                                                    {path:"tags",select:"_id name"},
                                                    {path:"author",select:"_id name image"}
                                                ]
                                            })
                                            .sort(sortCriteria)
                                            .skip(skip)
                                            .limit(limit)
                                            .lean<IcollectionDoc[]>();
        const next = totalCollections > skip + collections.length;
        return{
            success: true,
            data: {
                collections: collections,
                isNext: next
            }
        }
    }catch(e){
        return actionError(e);
    }
    

}