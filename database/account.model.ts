import { Document, model, models, Schema, Types } from "mongoose";

export interface Iaccount {
  userId: Types.ObjectId;
  name?: string;
  image?: string;
  password?: string;
  provider: string;
  providerAccountId: string;
}

interface IaccountDoc extends Iaccount, Document {}

const AccountSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    password: {
      type: String,
    },
    provider: {
      type: String,
      required: true,
    },
    providerAccountId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Account = models?.Account || model<Iaccount>("Account", AccountSchema);

export default Account;
