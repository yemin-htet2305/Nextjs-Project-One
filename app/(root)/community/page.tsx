import { auth } from "@/auth";
import CommonFilter from "@/Components/CommonFilter";
import DataRenderer from "@/Components/DataRenderer";
import Pagination from "@/Components/Pagination";
import UserCard from "@/Components/UserCard";
import { DefaultFilters, UserFilters } from "@/constant/filter";
import { GetUsers } from "@/lib/action/GetUsers.action";


async function page({searchParams}: {searchParams:Promise<{
  [key: string]: string;
}>}) {
  let session = await auth();
  const { page = 1, pageSize = 3, search, filter } = await searchParams;
  const {success,data,message,} = await GetUsers(
    {
      page: Number(page) || 1,
      pageSize: Number(pageSize) || 3,
      filter: filter || "",
      search: search || "",
    }
  );
  const users = data? data.users : [];
  const next = data? data.isNext: false;
  
  return (
    <>
    <div className="flex items-center justify-between p-2 mb-3">
      <h1 className="text-3xl font-bold">All Users</h1>
      <CommonFilter filters={UserFilters} dvalue={DefaultFilters.UserFilters}/>
    </div>
      <DataRenderer success={success} data={users} errorMessage={message} emptyState="user" render={(data) => (
                                                                          <div className="grid grid-cols-6 space-y-5 space-x-3">
                                                                            {data.map((u, i) => (
                                                                                <UserCard key={u._id} user={u}/>
                                                                            ))}
                                                                          </div>
                                                                        )}/>
      <Pagination isNext={next} currentPage={Number(page)}/>                                                                  
    </>
  );
}

export default page;
