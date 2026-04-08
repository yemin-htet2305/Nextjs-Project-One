import User from "@/database/user.model";
import dbConnect from "@/lib/dbConnect";
import { handleErrorResponse, handleSuccessResponse } from '@/lib/response';
import UserSchema from '@/lib/schemas/UserSchema';
import validateBody from '@/lib/validateBody';

export async function GET(){
    try{
        await dbConnect();
        let users = await User.find();
        return handleSuccessResponse(users, 200);
    }catch(e: unknown){
        return handleErrorResponse(e);
    }
}

export async function POST(request : Request){
    try{
        await dbConnect();

        const body = await request.json();

        validateBody(body, UserSchema);
        
        const existingEmail = await User.findOne({email: body.email});
        if (existingEmail) throw new Error("Email already exists!");
        const existingUsername = await User.findOne({username: body.username});
        if (existingUsername) throw new Error("Username already exists!");

        const newUser = await User.create(body);
        return handleSuccessResponse(newUser, 201);
    }catch(e: unknown){
        return handleErrorResponse(e);
    }
    
}