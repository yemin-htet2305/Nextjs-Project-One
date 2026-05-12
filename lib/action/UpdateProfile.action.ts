"use server"
import User from "@/database/user.model";
import dbConnect from "../dbConnect";
import { actionError } from "../response";
import validateBody from "../validateBody";
import UpdateProfileSchema from "../schemas/UpdateProfileSchema";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function UpdateProfile(params: {
  userId: string;
  name: string;
  username: string;
  bio?: string;
  location?: string;
  portfolio?: string;
  image?: string;
}): Promise<{
  success: Boolean;
  data?: object;
  message?: string;
  detail?: object | null;
}> {
  await dbConnect();
  try {
    const session = await auth();
    if (!session?.user?.id || session.user.id !== params.userId) {
      throw new Error("Unauthorized: you can only edit your own profile.");
    }

    const { userId, ...rest } = params;
    const validatedData = validateBody(rest, UpdateProfileSchema);

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: validatedData },
      { new: true }
    );

    if (!user) throw new Error("User not found.");

    revalidatePath(`/profile/${userId}`);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(user)),
    };
  } catch (e) {
    return actionError(e);
  }
}
