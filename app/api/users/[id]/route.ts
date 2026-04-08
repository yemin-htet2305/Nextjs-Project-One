import User from "@/database/user.model";
import dbConnect from "@/lib/dbConnect";
import { handleErrorResponse, handleSuccessResponse } from "@/lib/response";
import UserSchema from "@/lib/schemas/UserSchema";
import validateBody from "@/lib/validateBody";
import { Types } from "mongoose";
import { ZodError } from "zod/v4";


//Get user by ID
export async function GET(request: Request, { params }: { params: Promise<{ id: string }>}) {
    try {
        await dbConnect();

        const { id } = await params;
        if(!Types.ObjectId.isValid(id) ){
            throw new Error("Invalid user ID!");
        }
        
        let user = await User.findById(id);
        if (!user) {
            throw new Error("User not found!");
        }
        return handleSuccessResponse(user , 200);
    } catch (e : unknown) {
        return handleErrorResponse(e);
    }

    
}


// Delete user by ID
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }>}) {
    try {
        await dbConnect();

        const { id } = await params;
        if(!Types.ObjectId.isValid(id) ){
            throw new Error("Invalid user ID!");
        }
        
        let user = await User.findByIdAndDelete(id);
        if (!user) {
            throw new Error("User not found!");
        }
        return handleSuccessResponse(user , 200);
    } catch (e : unknown) {
        return handleErrorResponse(e);
    }
}

//Update user by ID
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }>}) {
    try {
        await dbConnect();

        const { id } = await params;
        let  body  = await request.json();
        const validatedData = validateBody(body, UserSchema, true);
        
        if(!Types.ObjectId.isValid(id) ){
            throw new Error("Invalid user ID!");
        }
        
        let user = await User.findByIdAndUpdate(id, validatedData, { new: true });
        if (!user) {
            throw new Error("User not found!");
        }
        return handleSuccessResponse(user , 200);
    } catch (e : unknown) {
        return handleErrorResponse(e);
    }
}

