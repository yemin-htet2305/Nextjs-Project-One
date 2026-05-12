import { GetUser } from "@/lib/action/GetUser.action";
import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";
import ROUTES from "@/route";
import EditProfileForm from "../../components/EditProfileForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function EditProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();

  if (!session?.user?.id) redirect(ROUTES.LOGIN);
  if (session.user.id !== id) redirect(ROUTES.PROFILE(id));

  const { success, data, message } = await GetUser({ userId: id });

  if (!success || !data) {
    if (message === "user not found!") return notFound();
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-red-400">{message ?? "Something went wrong."}</p>
      </div>
    );
  }

  const { user } = data;

  return (
    <div className="px-6 py-6">
      <div className="mb-6 flex items-center gap-3">
        <Link
          href={ROUTES.PROFILE(id)}
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to profile
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Profile</h1>
        <p className="text-sm text-gray-400 mt-1">
          Update your public profile information.
        </p>
      </div>

      <EditProfileForm
        userId={id}
        initialData={{
          name: user.name,
          username: user.username,
          bio: user.bio,
          location: user.location,
          portfolio: user.portfolio,
          image: user.image,
        }}
      />
    </div>
  );
}
