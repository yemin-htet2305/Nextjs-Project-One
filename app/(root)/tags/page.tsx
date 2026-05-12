import { auth } from "@/auth";
import CommonFilter from "@/Components/CommonFilter";
import DataRenderer from "@/Components/DataRenderer";
import Pagination from "@/Components/Pagination";
import TagCardInfo from "@/Components/TagCardInfo";
import { DefaultFilters, TagFilters } from "@/constant/filter";
import { GetTags } from "@/lib/action/GetTags.action";


async function page({searchParams}: {searchParams:Promise<{
  [key: string]: string;
}>}) {
  let session = await auth();
  const { page = 1, pageSize = 3, search, filter } = await searchParams;
  const {success,data,message,} = await GetTags(
    {
      page: Number(page) || 1,
      pageSize: Number(pageSize) || 3,
      filter: filter || "",
      search: search || "",
    }
  );
  const tags = data? data.tags : [];
  const next = data? data.isNext: false;
  
  return (
    <>
    <div className="flex items-center justify-between p-2 mb-5">
      <h1 className="text-3xl font-bold">All Tags</h1>
      <CommonFilter filters={TagFilters} dvalue={DefaultFilters.TagFilters}/>
    </div>
      <DataRenderer success={success} data={tags} errorMessage={message} emptyState="tag" render={(data) => (
                                                                          <div className="grid grid-cols-6 space-y-5 space-x-3">
                                                                            {data.map((t, i) => (
                                                                                <TagCardInfo key={t._id} tag={t}/>
                                                                            ))}
                                                                          </div>
                                                                        )}/>
      <Pagination isNext={next} currentPage={Number(page)}/>
    </>
  );
}

export default page;
