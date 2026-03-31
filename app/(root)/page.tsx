import { auth } from "@/auth";
import ButtonLink from "@/Components/ButtonLink";
import Filters from "@/Components/Filters";
import ThreadCard from "@/Components/ThreadCard";
import ROUTES from "@/route";

async function page({searchParams}: {searchParams:Promise<{search: string | undefined, filter: string | undefined}>}) {
  let session = await auth();
  const { search, filter } = await searchParams;

  return (
    <>
    <div className="flex items-center justify-between p-2">
      <h1 className="text-3xl font-bold">All Threads</h1>
      <ButtonLink href={ROUTES.QUESTION_CREATE}>Create a New Thread</ButtonLink>
    </div>
      <Filters/>
      <ThreadCard/>
    </>
  );
}

export default page;
