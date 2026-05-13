"use server"
import { auth } from "@/auth";
import dbConnect from "../dbConnect"
import mongoose from "mongoose";
import validateBody from "../validateBody";
import DeleteQuestionSchema from "../schemas/DeleteQuestionSchema";
import { actionError } from "../response";
import Question from "@/database/question.model";
import Collection from "@/database/collection.model";
import TagQuestion from "@/database/tag-question.model";
import Tag from "@/database/tag.model";
import Vote from "@/database/vote.model";
import Answer from "@/database/answer.model";
import { revalidatePath } from "next/cache";
import ROUTES from "@/route";

export async function DeleteQuestion(params: {
    questionId : string
}):Promise<{
    success: Boolean;
    message?: string;
    detail?: object | null;
}>{
    await dbConnect();
    const auth_session = await auth();
    const user = auth_session?.user;
    const session = await mongoose.startSession();

    try{
        session.startTransaction();
        const {questionId} = validateBody(params,DeleteQuestionSchema);

        const question = await Question.findById(questionId).session(session);
        if(!question) throw new Error("question not found!");

        if(user?.id !== question?.author.toString()) throw new Error("user not authorized!");

        await Collection.deleteMany({
            question: questionId
        }).session(session);

        await TagQuestion.deleteMany({
            question: questionId
        }).session(session);

        if(question.tags.length > 0){
            await Tag.updateMany({_id:{$in: question.tags}},
                {
                $inc: {questions: -1}
            }).session(session);
        }
        await Vote.deleteMany({
            type: "question",
            type_id: questionId
        }).session(session);

        const answers = await Answer.find({
            question: questionId
        }).session(session);

        if(answers.length > 0){
            await Vote.deleteMany({
                type: "answer",
                type_id: {$in: answers.map((a) => a._id)}
            }).session(session);
            await Answer.deleteMany({
                question:questionId
            }).session(session);
        }

        await Question.deleteOne({_id: questionId}).session(session);
        await session.commitTransaction();
        revalidatePath(ROUTES.PROFILE(user?.id?.toString() || ROUTES.HOME));
        return {success: true};
    }catch(e){
        await session.abortTransaction();
        return actionError(e);
    }finally{
        await session.endSession();
    }

}