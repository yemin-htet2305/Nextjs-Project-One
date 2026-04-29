import { Document, model, models, Schema } from "mongoose";

export interface Itag {
    name: string;
    questions: number;
}

export interface ItagDoc extends Itag, Document {}

const TagSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    questions: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

const Tag = models?.Tag || model<Itag>("Tag", TagSchema);

export default Tag;
