import Link from "next/link";
import { IoHome } from "react-icons/io5";

function LeftSideBar() {
  return (
    <div className="flex">
      <div className="w-1/5 px-5 py-3">
        <ul className="space-y-6">
          <li className="bg-main px-2 py-2 rounded-lg">
            <Link
              href="/"
              className="text-md font-bold flex items-center space-x-5"
            >
              <IoHome />
              <span>Home</span>
            </Link>
          </li>
          <li className="bg-primary px-2 py-2 rounded-lg">
            <Link
              href="/"
              className="text-md font-bold flex items-center space-x-5"
            >
              <IoHome />
              <span>Tags</span>
            </Link>
          </li>
          <li className="bg-primary px-2 py-2 rounded-lg">
            <Link
              href="/"
              className="text-md font-bold flex items-center space-x-5"
            >
              <IoHome />
              <span>Popular</span>
            </Link>
          </li>
          <li className="bg-primary px-2 py-2 rounded-lg">
            <Link
              href="/"
              className="text-md font-bold flex items-center space-x-5"
            >
              <IoHome />
              <span>Ask a new question</span>
            </Link>
          </li>
          <li className="bg-primary px-2 py-2 rounded-lg">
            <Link
              href="/"
              className="text-md font-bold flex items-center space-x-5"
            >
              <IoHome />
              <span>Newest</span>
            </Link>
          </li>
          <li className="bg-red-500 px-2 py-2 rounded-lg">
            <Link
              href="/"
              className="text-md font-bold flex items-center space-x-5"
            >
              <IoHome />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-3/5">2</div>
      <div className="w-1/5">3</div>
    </div>
  );
}
export default LeftSideBar;
