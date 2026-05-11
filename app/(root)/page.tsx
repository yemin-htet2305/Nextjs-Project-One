import { auth } from "@/auth";
import ButtonLink from "@/Components/ButtonLink";
import CommonFilter from "@/Components/CommonFilter";
import DataRenderer from "@/Components/DataRenderer";
import Filters from "@/Components/Filters";
import ThreadCard from "@/Components/ThreadCard";
import { DefaultFilters, HomePageFilters } from "@/constant/filter";
import { GetQuestions } from "@/lib/action/GetQuestions.action";
import ROUTES from "@/route";

async function page({searchParams}: {searchParams:Promise<{
  [key: string]: string;
}>}) {
  let session = await auth();
  const { page, pageSize, search, filter } = await searchParams;
  const {success,data,message,} = await GetQuestions(
    {
      page: Number(page) || 1,
      pageSize: Number(pageSize) || 10,
      filter: filter || "",
      search: search || "",
    }
  );
  const questions = data? data.questions : [];
  return (
    <>
    <div className="flex items-center justify-between p-2">
      <h1 className="text-3xl font-bold">All Threads</h1>
      <CommonFilter filters={HomePageFilters} dvalue={DefaultFilters.HomePageFilters}/>
      <ButtonLink href={ROUTES.QUESTION_CREATE}>Create a New Thread</ButtonLink>
    </div>
      <Filters/>
      <DataRenderer success={success} data={questions} errorMessage={message} render={(data) => (
                                                                          <div className="flex flex-col space-y-7">
                                                                            {data.map((q, i) => (
                                                                              <ThreadCard key={i} question={q} />
                                                                            ))}
                                                                          </div>
                                                                        )}/>
    </>
  );
}

export default page;
