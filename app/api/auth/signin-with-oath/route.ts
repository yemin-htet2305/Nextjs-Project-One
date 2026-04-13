import Account from "@/database/account.model";
import User from "@/database/user.model";
import dbConnect from "@/lib/dbConnect";
import { handleErrorResponse, handleSuccessResponse } from "@/lib/response";
import SignInWithOauthSchema from "@/lib/schemas/SignInWithOauthSchema";
import validateBody from "@/lib/validateBody";
import mongoose from "mongoose";
import slugify from "slugify";


export async function POST(request: Request) {
    const {provider, providerAccountId,user} = await request.json();
    await dbConnect();
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
    const valitedData = validateBody({
        provider: provider,
        providerAccountId: providerAccountId,
        user: user
    },SignInWithOauthSchema);

    const {email, username, name, image} = valitedData.user;
    let existingUser = await User.findOne({email: email}).session(session);
    if(!existingUser){
        [existingUser] = await User.create([{
            email,
            username: slugify(username,{
                lower: true,
                strict: true,
                trim: true
            }),
            name,
            image
        }],{session});
    }else{
        await User.updateOne({_id: existingUser._id},{
            name,
            image
        }).session(session);
    }

    const existingAccount = await Account.findOne({
        userId:existingUser._id,
        provider,
        providerAccountId
    }).session(session);
    if(!existingAccount){
        await Account.create([{
            userId: existingUser._id,
            provider: provider,
            providerAccountId: providerAccountId,}],{session});
    }

    await session.commitTransaction();
    return handleSuccessResponse(existingUser,200);
    }catch(error){
        console.error("Error in sign-in with OAuth:", error);
        await session.abortTransaction();
        return handleErrorResponse(error);
    }finally{
        session.endSession();
    }

}