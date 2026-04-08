import Account from "@/database/account.model";
import dbConnect from "@/lib/dbConnect";
import { handleErrorResponse, handleSuccessResponse } from "@/lib/response";
import AccountSchema from "@/lib/schemas/AccountSchema";
import validateBody from "@/lib/validateBody";

//get all accounts
export async function GET(){
    try{
        await dbConnect();
        let accounts = await Account.find();
        return handleSuccessResponse(accounts, 200);

    }catch(error){
        return handleErrorResponse(error);
    }
}

export async function POST(request: Request){
    try{
        await dbConnect();
        const body = await request.json();
        validateBody(body, AccountSchema);

        const existingAccount = await Account.findOne({provider: body.provider, providerAccountId: body.providerAccountId});
        if(existingAccount) throw new Error("Account already exists!");

        const newAccount = await Account.create(body);
        return handleSuccessResponse(newAccount, 201);

    }catch(error){
        return handleErrorResponse(error);
    }
}