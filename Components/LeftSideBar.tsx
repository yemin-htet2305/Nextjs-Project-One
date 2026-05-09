import { auth } from "@/auth";
import { handleSignOut } from "@/lib/action/handleSignOut.action";
import ROUTES from "@/route";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoHome } from "react-icons/io5";

async function LeftSideBar() {
  let session = await auth();
  let user = session?.user
  return (
    <div className="w-1/5 px-5 py-3">
      <ul className="space-y-6">
        <li className="bg-main px-2 py-2 rounded-lg">
          <Link
            href={ROUTES.HOME}
            className="text-md font-bold flex items-center space-x-5"
          >
            <IoHome />
            <span>Home</span>
          </Link>
        </li>
        <li className="bg-primary px-2 py-2 rounded-lg">
          <Link
            href={ROUTES.TAGS}
            className="text-md font-bold flex items-center space-x-5"
          >
            <IoHome />
            <span>Tags</span>
          </Link>
        </li>
        <li className="bg-primary px-2 py-2 rounded-lg">
          <Link
            href={ROUTES.HOME}
            className="text-md font-bold flex items-center space-x-5"
          >
            <IoHome />
            <span>Popular</span>
          </Link>
        </li>
        <li className="bg-primary px-2 py-2 rounded-lg">
          <Link
            href={ROUTES.QUESTIONS}
            className="text-md font-bold flex items-center space-x-5"
          >
            <IoHome />
            <span>Ask a new question</span>
          </Link>
        </li>
        <li className="bg-primary px-2 py-2 rounded-lg">
          <Link
            href={ROUTES.COMMUNITY}
            className="text-md font-bold flex items-center space-x-5"
          >
            <IoHome />
            <span>Community</span>
          </Link>
        </li>
        {user && <li className="bg-red-500 px-2 py-2 rounded-lg">
          <form action={handleSignOut}>
            <button type="submit"
              className="text-md 
              font-bold flex 
              items-center 
              space-x-5
              hover:cursor-pointer"
            >
              <IoHome />
              <span>Logout</span>
            </button>
          </form>
        </li>}
        {!user && <li className="bg-secondary border-main border-2 px-2 py-2 rounded-lg">
          <form action={async () => {
            "use server";
            return redirect(ROUTES.LOGIN)
          }}>
            <button type="submit"
              className="text-md font-bold flex items-center space-x-5"
            >
              <IoHome />
              <span>Sign In</span>
            </button>
          </form>
        </li>}
      </ul>
    </div>
  );
}
export default LeftSideBar;
