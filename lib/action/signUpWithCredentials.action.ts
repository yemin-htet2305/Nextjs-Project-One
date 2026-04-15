"use server";
import mongoose from "mongoose";
import dbConnect from "../dbConnect";
import { actionError} from "../response";
import validateBody from "../validateBody";
import SignUpSchema from "../schemas/SignUpSchema";
import User from "@/database/user.model";
import Account from "@/database/account.model";
import bcrypts from "bcryptjs";
import { signIn } from "@/auth";

export async function signUpWithCredentials(params: {name: string; username: string; email: string; password: string}) {
    await dbConnect();
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const validateData =  validateBody(params, SignUpSchema);
        const { name, username, email, password } = validateData;
        const existingEmail = await User.findOne({ email });
        const existingUsername = await User.findOne({username});
        if (existingEmail) throw new Error("Email already exists!");
        if (existingUsername) throw new Error("Username already exists!");

        const [newuser] = await User.create([{
            name,
            username,
            email,
        }],{session})

        const [newaccount] = await Account.create([{
            userId: newuser._id,
            provider: "credentials",
            providerAccountId: email,
            password: await bcrypts.hash(password, 10)
        }],{session})

        await session.commitTransaction();
        await signIn("credentials",{email, password, redirect: false});
        return {success: true};
    }catch(error){
        console.error("Error in sign-up with credentials:", error);
        await session.abortTransaction();
        return actionError(error);
    }finally{
        session.endSession();
    }

}