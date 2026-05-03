import { auth } from "@/auth";
import DataRenderer from "@/Components/DataRenderer";
import TagCardInfo from "@/Components/TagCardInfo";
import { GetTags } from "@/lib/action/GetTags.action";


async function page({searchParams}: {searchParams:Promise<{
  [key: string]: string;
}>}) {
  let session = await auth();
  const { page, pageSize, search, filter } = await searchParams;
  const {success,data,message,} = await GetTags(
    {
      page: Number(page) || 1,
      pageSize: Number(pageSize) || 10,
      filter: filter || "",
      search: search || "",
    }
  );
  const tags = data? data.tags : [];
  
  return (
    <>
    <div className="flex items-center justify-between p-2">
      <h1 className="text-3xl font-bold">All Tags</h1>
    </div>
      <DataRenderer success={success} data={tags} errorMessage={message} render={(data) => (
                                                                          <div className="grid grid-cols-4 space-y-3 space-x-3">
                                                                            {data.map((t, i) => (
                                                                                <TagCardInfo key={i} tag={t}/>
                                                                            ))}
                                                                          </div>
                                                                        )}/>
    </>
  );
}

export default page;
