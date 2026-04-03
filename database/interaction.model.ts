import { Document, model, models, Schema, Types } from "mongoose";

export interface Iinteraction {
    user: Types.ObjectId;
    action: string;
    actionId: Types.ObjectId;
    actionType: "question" | "answer";
}

interface IinteractionDoc extends Iinteraction, Document {}

const InteractionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    action: {
        type: String,
        required: true,
    },
    actionId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    actionType: {
        type: String,
        required: true,
        enum: ["question", "answer"],
    },
}, { timestamps: true });

const Interaction = models?.Interaction || model<Iinteraction>("Interaction", InteractionSchema);

export default Interaction;
