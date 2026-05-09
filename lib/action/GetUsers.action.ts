"use server"
import User, { IuserDoc } from "@/database/user.model";
import dbConnect from "../dbConnect";
import { actionError } from "../response";
import PaginatedSearchParamsSchema from "../schemas/PaginatdSearchParamsSchema";
import validateBody from "../validateBody";
import { FilterQuery } from "mongoose";

export async function GetUsers(params:{
    page: number;
    pageSize:number;
    search?: string;
    filter?: string;
    sort?: string;
}):Promise<{
    success: Boolean;
    data?: {
        users: IuserDoc[],
        isNext: Boolean
    },
    message?: string;
    detail?: object | null;
}>{
    await dbConnect();
    try{
        const {page,pageSize,search,filter,sort} = validateBody(params,PaginatedSearchParamsSchema);
        const skip = (Number(page) - 1) * Number(pageSize);
        const limit = Number(pageSize);

        const filterQuery: FilterQuery<typeof User> = {}

        if(search){
            filterQuery.$or = [
                {name: {$regex: search, option: "i"}},
                {email: {$regex: search,option: "i"}}
            ]
        }

        let sortCriteria = {};
        switch(filter){
            case "newest":
                sortCriteria = {createdAt: -1};
                break;
            case "oldest":
                sortCriteria = {createdAt: 1};
                break;
            case "popular":
                sortCriteria = {reputation: 1};
                break;
            default:
                sortCriteria = {createdAt: -1};
        }
        const totalUsers = await User.countDocuments();
        const users = await User.find(filterQuery)
                                .skip(skip)
                                .limit(limit)
                                .lean<IuserDoc[]>();
        const next = totalUsers > skip + users.length;

        return{
            success: true,
            data: {
                users: users,
                isNext: next
            }
        }
    }catch(e){
        return actionError(e);
    }
}