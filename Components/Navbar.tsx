import Image from "next/image";
import logo from "@/public/logo.png";
import SearchInput from "./SearchInput";
import { auth } from "@/auth";
import { GetUser } from "@/lib/action/GetUser.action";
import Link from "next/link";
import ROUTES from "@/route";

function getColorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${Math.abs(hash) % 360}, 65%, 55%)`;
}

async function Navbar() {
  const session = await auth();
  const sessionUser = session?.user;

  // Fetch fresh user from DB so profile picture updates are reflected immediately
  const dbUser = sessionUser?.id
    ? (await GetUser({ userId: sessionUser.id })).data?.user
    : null;

  const name = dbUser?.name ?? sessionUser?.name ?? "";
  const image = dbUser?.image ?? sessionUser?.image ?? "";
  const userId = sessionUser?.id ?? "";

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
        {sessionUser && (
          <Link
            href={ROUTES.PROFILE(userId)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            {image ? (
              image.startsWith("/") ? (
                <Image
                  src={image}
                  alt={name}
                  width={35}
                  height={35}
                  className="rounded-full object-cover shrink-0"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={image}
                  alt={name}
                  width={35}
                  height={35}
                  className="rounded-full object-cover shrink-0"
                  referrerPolicy="no-referrer"
                />
              )
            ) : (
              <div
                className="w-8.75 h-8.75 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                style={{ backgroundColor: getColorFromName(name) }}
              >
                {name[0]?.toUpperCase() ?? "?"}
              </div>
            )}
            <span>{name}</span>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
