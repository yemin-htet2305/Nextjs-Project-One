"use server";

import { auth } from "@/auth";
import dbConnect from "../dbConnect";
import { actionError } from "../response";
import validateBody from "../validateBody";
import PaginatedSearchParamsSchema from "../schemas/PaginatdSearchParamsSchema";
import Answer, { IanswerDoc } from "@/database/answer.model";

export async function GetUserAnswers(params: {
  page?: number;
  pageSize?: number;
  search?: string;
  filter?: string;
  sort?: string;
}): Promise<{
  data?: {
    answers: IanswerDoc[];
    isNext: Boolean;
  };
  success: Boolean;
  message?: string;
  details?: object | null;
}> {
  await dbConnect();
  const auth_session = await auth();
  const userId = auth_session?.user?.id;
  try {
    const { page, pageSize, search, filter, sort } = validateBody(
      params,
      PaginatedSearchParamsSchema
    );

    const skip = (Number(page) - 1) * Number(pageSize);
    const limit = Number(pageSize);

    const totalAnswers = await Answer.countDocuments({
      author: userId,
    });
    const answers = await Answer.find({
      author: userId,
    })
      .populate("author", "name")
      .populate("question", "title")
      .sort({createdAt: -1})
      .skip(skip)
      .limit(limit)
      .lean<IanswerDoc[]>();
    const next = totalAnswers > skip + answers.length;

    return { success: true, data: { answers: answers, isNext: next } };
  } catch (e) {
    return actionError(e);
  }
}
