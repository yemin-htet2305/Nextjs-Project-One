import { auth } from "@/auth";
import { handleSignOut } from "@/lib/action/handleSignOut.action";
import ROUTES from "@/route";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoHome } from "react-icons/io5";
import NavLinks from "./NavLinks";

async function LeftSideBar() {
  let session = await auth();
  let user = session?.user
  return (
    <div className="w-1/5 px-5 py-3">
      <ul className="space-y-6">
        <NavLinks />
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
