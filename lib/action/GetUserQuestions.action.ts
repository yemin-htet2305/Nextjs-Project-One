"use server";

import { auth } from "@/auth";
import dbConnect from "../dbConnect";
import { actionError } from "../response";
import validateBody from "../validateBody";
import PaginatedSearchParamsSchema from "../schemas/PaginatdSearchParamsSchema";
import Question, { IquestionDoc } from "@/database/question.model";

export async function GetUserQuestions(params: {
  page?: number;
  pageSize?: number;
  search?: string;
  filter?: string;
  sort?: string;
}): Promise<{
  data?: {
    questions: IquestionDoc[];
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

    const totalQuestions = await Question.countDocuments({
      author: userId,
    });
    const questions = await Question.find({
      author: userId,
    })
      .populate("author","name image")
      .populate("tags", "name")
      .sort({createdAt: -1})
      .skip(skip)
      .limit(limit)
      .lean<IquestionDoc[]>();
    const next = totalQuestions > skip + questions.length;

    return { success: true, data: { questions: questions, isNext: next } };
  } catch (e) {
    return actionError(e);
  }
}
