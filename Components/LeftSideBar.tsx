import ROUTES from "@/route";
import Link from "next/link";
import { IoHome } from "react-icons/io5";

function LeftSideBar() {
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
            href={ROUTES.HOME}
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
            href={ROUTES.HOME}
            className="text-md font-bold flex items-center space-x-5"
          >
            <IoHome />
            <span>Newest</span>
          </Link>
        </li>
        <li className="bg-red-500 px-2 py-2 rounded-lg">
          <Link
            href={ROUTES.HOME}
            className="text-md font-bold flex items-center space-x-5"
          >
            <IoHome />
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
export default LeftSideBar;
