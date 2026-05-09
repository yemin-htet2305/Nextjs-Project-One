import { auth } from "@/auth";
import DataRenderer from "@/Components/DataRenderer";
import UserCard from "@/Components/UserCard";
import { GetUsers } from "@/lib/action/GetUsers.action";


async function page({searchParams}: {searchParams:Promise<{
  [key: string]: string;
}>}) {
  let session = await auth();
  const { page, pageSize, search, filter } = await searchParams;
  const {success,data,message,} = await GetUsers(
    {
      page: Number(page) || 1,
      pageSize: Number(pageSize) || 10,
      filter: filter || "",
      search: search || "",
    }
  );
  const users = data? data.users : [];
  
  return (
    <>
    <div className="flex items-center justify-between p-2">
      <h1 className="text-3xl font-bold">All Users</h1>
    </div>
      <DataRenderer success={success} data={users} errorMessage={message} render={(data) => (
                                                                          <div className="grid grid-cols-6 space-y-5 space-x-3">
                                                                            {data.map((u, i) => (
                                                                                <UserCard key={i} user={u}/>
                                                                            ))}
                                                                          </div>
                                                                        )}/>
    </>
  );
}

export default page;
