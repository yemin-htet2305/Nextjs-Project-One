import ButtonLink from "@/Components/ButtonLink";
import DataRenderer from "@/Components/DataRenderer";
import ThreadCard from "@/Components/ThreadCard";
import { GetTagQuestions } from "@/lib/action/GetTagQuestions.action";
import ROUTES from "@/route";

async function page({searchParams,params}: {searchParams:Promise<{
  [key: string]: string;
}>, params: Promise<{id: string}>}) {
  const {id} = await params;
  const { page, pageSize, search } = await searchParams;
  const {success,data,message} = await GetTagQuestions(
    {
      page: Number(page) || 1,
      pageSize: Number(pageSize) || 10,
      search: search || "",
      tagId: id,
    }
  );
  const questions = data? data.questions : [];
  const tag = data?.tag ;
  return (
    <>
    <div className="flex items-center justify-between p-2">
      <h1 className="text-3xl font-bold">{tag? tag.name : "Hello"}</h1>
      <ButtonLink href={ROUTES.QUESTION_CREATE}>Create a New Thread</ButtonLink>
    </div>
      <DataRenderer success={success} data={questions} errorMessage={message} emptyState="question" render={(data) => (
                                                                          <div className="flex flex-col space-y-3">
                                                                            {data.map((q, i) => (
                                                                              <ThreadCard key={i} question={q} />
                                                                            ))}
                                                                          </div>
                                                                        )}/>
    </>
  );
}

export default page;

