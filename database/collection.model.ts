import { Document, model, models, Schema, Types } from "mongoose";

export interface Icollection {
    author: Types.ObjectId;
    question: Types.ObjectId;
}

export interface IcollectionDoc extends Icollection, Document {}

const CollectionSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: "Question",
        required: true,
    },
}, { timestamps: true });

CollectionSchema.index({ author: 1, question: 1 }, { unique: true });

const Collection = models?.Collection || model<Icollection>("Collection", CollectionSchema);

export default Collection;
