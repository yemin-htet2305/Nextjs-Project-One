"use server";

import dbConnect from "../dbConnect";
import { actionError} from "../response";
import validateBody from "../validateBody";
import User from "@/database/user.model";
import bcrypts from "bcryptjs";
import { signIn } from "@/auth";
import SignInSchema from "../schemas/SignInSchema";
import Account from "@/database/account.model";

export async function signInWithCredentials(params: {name: string; username: string; email: string; password: string}) {
    await dbConnect();
    
    try{
        const validateData =  validateBody(params, SignInSchema)
        const { email, password } = validateData;
        
        const existingUser = await User.findOne({email})
        if(!existingUser) throw new Error("User not found!");
        const existingAccount = await Account.findOne({
            provider: "credentials",
            providerAccountId: email
        })
        if(!existingAccount) throw new Error("Account not found!");
        const validPass = await bcrypts.compare(password,existingAccount.password)

        if(!validPass) throw new Error("Password is not matched!")
        
        await signIn("credentials",{email, password, redirect: false});
        return {success: true};
    }catch(error){
        return actionError(error);
    }
}