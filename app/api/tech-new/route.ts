import { handleErrorResponse, handleSuccessResponse } from "@/lib/response";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        const response = await fetch('https://dev.to/api/articles?per_page=20');
        const techNews = await response.json();
        return handleSuccessResponse(techNews,200);
    }catch(e){
        return handleErrorResponse(e);
    }
}