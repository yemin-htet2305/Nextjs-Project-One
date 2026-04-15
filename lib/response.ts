import { NextResponse } from "next/server"
import { ZodError } from "zod/v4";


const handleSuccessResponse = (data: unknown, status: number = 200) => {
    return NextResponse.json({
        data: data,
        success: true,
    },{status: status})
}

const handleErrorResponse = (error: unknown) => {
    let status = 500;
    let message = error instanceof Error ? error.message : "Internal Server Error";
    let detail = null
    if(error instanceof ZodError){
        status = 400;
        message = "Validation Error";
        detail = error.flatten().fieldErrors;
    }
    return NextResponse.json({
        message: message,
        success: false,
        detail: detail,
    }, {status: status})
}

const actionError = (error: unknown) => {
    let status = 500;
    let message = error instanceof Error ? error.message : "Internal Server Error";
    let detail = null
    if(error instanceof ZodError){
        status = 400;
        message = "Validation Error";
        detail = error.flatten().fieldErrors;
    }
    return {
        message: message,
        success: false,
        detail: detail,
    };

}
export {handleSuccessResponse, handleErrorResponse,actionError};