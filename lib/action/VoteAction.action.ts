'use server';
import { auth } from "@/auth";
import dbConnect from "../dbConnect";
import { actionError } from "../response";
import VoteActionSchema from "../schemas/VoteActionSchema";
import validateBody from "../validateBody";
import mongoose from "mongoose";
import Question from "@/database/question.model";
import Answer from "@/database/answer.model";
import Vote from "@/database/vote.model";

export async function VoteAction(params:{
    type: "question"| "answer";
    typeId: string;
    voteType: "upvote"|"downvote"|null;
}):Promise<{
    success: Boolean;
    data?: {
        upvotes: number,
        downvotes: number,
        voteType: "upvote"|"downvote"|null
    };
    message?: string;
    detail?: object | null;
}>{
    await dbConnect();
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const{type,typeId,voteType} = validateBody(params,VoteActionSchema)
        const auth_sessoin = await auth();
        const user = auth_sessoin?.user;
        const userId = auth_sessoin?.user?.id;

        if(!user) throw new Error("Unauthorized");

        const Model = type === "question"? Question: Answer;
        const item = await Model.findById(typeId).session(session)
        if(!item) throw new Error("Item not found");

        const existingVote = await Vote.findOne({
            author: userId,
            type_id:typeId,
            type,
        }).session(session)

        let newUpvotes = item?.upvotes || 0;
        let newDownvotes = item?.downvotes || 0;
        let userType = null; 
        if(existingVote){
            if(existingVote.voteType === voteType){
                if(voteType === "upvote"){
                    newUpvotes = Math.max(0, newUpvotes -1);
                }else{
                    newDownvotes = Math.max(0, newDownvotes -1);
                }
                await Vote.findByIdAndDelete(existingVote._id).session(session);
                userType = null;
            }else{
                if(voteType === "upvote"){
                     newDownvotes = Math.max(0, newDownvotes -1);
                     newUpvotes += 1;
                }else{
                    newUpvotes = Math.max(0, newUpvotes -1);
                    newDownvotes += 1;
                }
                existingVote.voteType = voteType;
                userType = voteType;
                await existingVote.save({session});
            }
        }else{
            await Vote.create([{
                author : userId,
                type_id: typeId,
                type,
                voteType
            }],{session})
            if(voteType === "upvote"){
                newUpvotes += 1;
            }else{
                newDownvotes += 1;
            }
            userType = voteType
        }

        item.upvotes = newUpvotes;
        item.downvotes = newDownvotes;
        await item.save({session});
        await session.commitTransaction();
        return {success: true,
            data: {
                upvotes: newUpvotes,
                downvotes: newDownvotes,
                voteType: userType
            }
        };
    }catch(e){
        await session.abortTransaction();
        return actionError(e);
    }finally{
        await session.endSession();
    }
}