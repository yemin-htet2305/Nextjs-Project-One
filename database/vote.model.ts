import { Document, model, models, Schema, Types } from "mongoose";

export interface Ivote {
    author: Types.ObjectId;
    type_id: Types.ObjectId;
    type: "question" | "answer";
    voteType: "upvote" | "downvote";
}

export interface IvoteDoc extends Ivote, Document {}

const VoteSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    type_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["question", "answer"],
    },
    voteType: {
        type: String,
        required: true,
        enum: ["upvote", "downvote"],
    },
}, { timestamps: true });


const Vote = models?.Vote || model<Ivote>("Vote", VoteSchema);

export default Vote;
