import Image from "next/image";
import logo from "@/public/logo.png";
import profile from "@/public/profile.jpg";
import SearchInput from "./SearchInput";
import { auth } from "@/auth";

async function Navbar() {
  let session = await auth();
  let user = session?.user
  return (
    <nav className="flex justify-between px-10 py-6">
      <div className="flex items-center justify-center space-x-4">
        <Image
          src={logo}
          alt="logo"
          width={60}
          className="rounded-full"
          height={60}
        />
        <h1 className="font-bold text-2xl">
          Nextjs<span className="text-main"> Coder</span>
        </h1>
      </div>
      <div className="w-[600px]">
        <SearchInput/>
      </div>
      <div className="flex flex-row p-3 items-center justify-center space-x-2">
        {user && <Image
          src={user?.image || profile}
          alt="profile"
          width={35}
          className="rounded-full"
          height={30}
        />}
        <span>{user?.name}</span>
      </div>
    </nav>
  );
}

export default Navbar;
