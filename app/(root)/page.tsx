import { auth } from "@/auth";
import Filters from "@/Components/Filters";
import ThreadCard from "@/Components/ThreadCard";

async function page({searchParams}: {searchParams:Promise<{search: string | undefined, filter: string | undefined}>}) {
  let session = await auth();
  const { search, filter } = await searchParams;

  return (
    <>
    <div className="flex items-center justify-between p-2">
      <h1 className="text-3xl font-bold">All Threads</h1>
      <button
      className="px-2 py-2 bg-main rounded-lg text-gray-200"
      >
        Create New Thread
      </button>
    </div>
      <Filters/>
      <ThreadCard/>
    </>
  );
}

export default page;
