import Account from "@/database/account.model";
import dbConnect from "@/lib/dbConnect";
import { handleErrorResponse, handleSuccessResponse } from "@/lib/response";
import AccountSchema from "@/lib/schemas/AccountSchema";
import validateBody from "@/lib/validateBody";
import { Types } from "mongoose";



//Get account by ID
export async function GET(request: Request, { params }: { params: Promise<{ id: string }>}) {
    try {
        await dbConnect();

        const { id } = await params;
        if(!Types.ObjectId.isValid(id) ){
            throw new Error("Invalid account ID!");
        }
        
        let account = await Account.findById(id);
        if (!account) {
            throw new Error("Account not found!");
        }
        return handleSuccessResponse(account , 200);
    } catch (e : unknown) {
        return handleErrorResponse(e);
    }

    
}


// Delete account by ID
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }>}) {
    try {
        await dbConnect();

        const { id } = await params;
        if(!Types.ObjectId.isValid(id) ){
            throw new Error("Invalid account ID!");
        }
        
        let account = await Account.findByIdAndDelete(id);
        if (!account) {
            throw new Error("Account not found!");
        }
        return handleSuccessResponse(account , 200);
    } catch (e : unknown) {
        return handleErrorResponse(e);
    }
}

//Update account by ID
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }>}) {
    try {
        await dbConnect();

        const { id } = await params;
        let  body  = await request.json();
        const validatedData = validateBody(body, AccountSchema, true);
        
        if(!Types.ObjectId.isValid(id) ){
            throw new Error("Invalid account ID!");
        }
        
        let account = await Account.findByIdAndUpdate(id, validatedData, { new: true });
        if (!account) {
            throw new Error("Account not found!");
        }
        return handleSuccessResponse(account , 200);
    } catch (e : unknown) {
        return handleErrorResponse(e);
    }
}

