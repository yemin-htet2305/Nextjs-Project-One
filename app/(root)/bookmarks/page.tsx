import { auth } from "@/auth";
import ButtonLink from "@/Components/ButtonLink";
import CommonFilter from "@/Components/CommonFilter";
import DataRenderer from "@/Components/DataRenderer";
import Filters from "@/Components/Filters";
import Pagination from "@/Components/Pagination";
import ThreadCard from "@/Components/ThreadCard";
import { CollectionFilters, DefaultFilters } from "@/constant/filter";
import { GetBookmarkQuestions } from "@/lib/action/GetBookmarkQuestions.action";
import ROUTES from "@/route";

async function page({searchParams}: {searchParams:Promise<{
  [key: string]: string;
}>}) {
  let session = await auth();
  const { page = 1, pageSize = 1, search, filter } = await searchParams;
  const {success,data,message,} = await GetBookmarkQuestions(
    {
      page: Number(page) || 1,
      pageSize: Number(pageSize) || 1,
      filter: filter || "",
      search: search || "",
    }
  );
  const collections = data? data.collections : [];
  const next = data? data.isNext: false;
  
  return (
    <>
    <div className="flex items-center justify-between p-2">
      <h1 className="text-3xl font-bold">Saved Questions</h1>
      <CommonFilter filters={CollectionFilters} dvalue={DefaultFilters.CollectionFilters}/>
      <ButtonLink href={ROUTES.QUESTION_CREATE}>Create a New Thread</ButtonLink>
    </div>
      <Filters/>
      <DataRenderer success={success} data={collections} errorMessage={message} emptyState="collection" render={(collections) => (
                                                                          <div className="flex flex-col space-y-7">
                                                                            {collections.map((c, i) => (
                                                                              <ThreadCard key={c.question._id} question={c.question} />
                                                                            ))}
                                                                          </div>
                                                                        )}/>
      <Pagination isNext={next} currentPage={Number(page)}/>
    </>
  );
}

export default page;
