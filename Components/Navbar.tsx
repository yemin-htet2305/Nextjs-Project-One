import Image from "next/image";
import logo from "@/public/logo.png";
import profile from "@/public/profile.jpg";

function Navbar() {
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
        <h1 className="font-bold">
          Nextjs<span className="text-main"> Coder</span>
        </h1>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search Anything Globally"
          className="px-4 py-2 rounded-md bg-primary text-white w-[600px]"
        />
      </div>
      <div>
        <Image
          src={profile}
          alt="profile"
          width={45}
          className="rounded-full"
          height={40}
        />
      </div>
    </nav>
  );
}

export default Navbar;
