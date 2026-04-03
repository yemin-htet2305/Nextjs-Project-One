import { Document, model, models, Schema, Types } from "mongoose";

export interface ItagQuestion {
  tag: Types.ObjectId;
  question: Types.ObjectId;
}

interface ItagQuestionDoc extends ItagQuestion, Document {}

const TagQuestionSchema = new Schema(
  {
    tag: {
      type: Schema.Types.ObjectId,
      ref: "Tag",
      required: true,
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
  },
  { timestamps: true }
);

// index for fast lookups and prevent duplicates
TagQuestionSchema.index({ tag: 1, question: 1 }, { unique: true });

const TagQuestion =
  models?.TagQuestion || model<ItagQuestion>("TagQuestion", TagQuestionSchema);

export default TagQuestion;
