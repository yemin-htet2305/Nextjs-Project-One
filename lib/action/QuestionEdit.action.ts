"use server"
import { auth } from "@/auth";
import dbConnect from "../dbConnect"
import validateBody from "../validateBody";
import mongoose from "mongoose";
import { actionError } from "../response";
import Question from "@/database/question.model";
import Tag, { ItagDoc } from "@/database/tag.model";
import TagQuestion from "@/database/tag-question.model";
import QuestionEditSchema from "../schemas/QuestionEditSchema";

export async function QuestionEdit(params:{
    questionId: string,
    title: string,
    content: string,
    tags : string[]
}): Promise<
{
    success: boolean,
    data?: {
        _id: string,
        title: string,
        author:string,
        content: string,
        tags: string[]
    }
}> {
    await dbConnect();
    
    const auth_session = await auth();
    const userId = auth_session?.user?.id;

    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const {questionId, title, content, tags} = validateBody(params, QuestionEditSchema);

        let question = await Question.findById(questionId).populate('tags').session(session);
        if(!question) throw new Error('question not found');

        if (question.title !== title || question.content !== content) {
            question.title = title;
            question.content = content;
            await question.save({session});
        }

        const incomingTagNames = tags.map(t => t.toLowerCase());
        const existingTagNames = question.tags.map((t: ItagDoc) => t.name.toLowerCase());
        const tagsToAdd = tags.filter((tag: string) => !existingTagNames.includes(tag.toLowerCase()));
        const tagsToRemove = question.tags.filter((tag: ItagDoc) => !incomingTagNames.includes(tag.name.toLowerCase()));

        if(tagsToRemove.length){
            const tagIdsToRemove = tagsToRemove.map((tag: ItagDoc) => tag._id);
            await Tag.updateMany({_id: {$in: tagIdsToRemove}}, {$inc: {questions: -1}}, {session});

            await TagQuestion.deleteMany({question: question._id, tag: {$in: tagIdsToRemove}}, {session});

           question.tags = question.tags.filter(
                           (tag: ItagDoc) => !tagIdsToRemove.some(
                          (id: mongoose.Types.ObjectId) => id.equals(tag._id)
                                 )
                       );
        }

        if(tagsToAdd.length){
            const newTagDocs = [];
            for(const tag of tagsToAdd){
                const existingTag = await Tag.findOneAndUpdate({name: {$regex: new RegExp(`^${tag}$`, 'i')}}, 
                {$setOnInsert: { name: tag.toLowerCase() },
                $inc: {questions: 1}},
                {new: true, upsert: true, session});

                if(existingTag){
                    const existingTagQuesion = await TagQuestion.findOne({question: question._id, 
                        tag: existingTag._id}).session(session);
                    if(!existingTagQuesion){
                        newTagDocs.push({question: question._id, tag: existingTag._id});
                    }
                }
                if(!question.tags.find((tagId: mongoose.Types.ObjectId) => tagId.equals(existingTag._id))){
                    question.tags.push(existingTag._id);
                }
            }
            if(newTagDocs.length){
                    await TagQuestion.insertMany(newTagDocs, {session});
                }
        }
        await question.save({session});
        await session.commitTransaction();
        return { success: true, data: JSON.parse(JSON.stringify(question)) };

    }catch(err){
        await session.abortTransaction();
        return actionError(err);
    }finally{
        session.endSession();
    }
}