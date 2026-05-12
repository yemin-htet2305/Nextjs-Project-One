"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import ROUTES from "@/route"
import { IoHome, IoBookmark, IoPeople } from "react-icons/io5"
import { FaTags, FaFire } from "react-icons/fa"

const navItems = [
  { label: "Home",      href: ROUTES.HOME,      icon: IoHome    },
  { label: "Tags",      href: ROUTES.TAGS,      icon: FaTags    },
  { label: "Popular",   href: ROUTES.HOME,      icon: FaFire    },
  { label: "Bookmark",  href: ROUTES.BOOKMARK,  icon: IoBookmark },
  { label: "Community", href: ROUTES.COMMUNITY, icon: IoPeople  },
]

function NavLinks() {
  const pathname = usePathname()

  return (
    <>
      {navItems.map(({ label, href, icon: Icon }) => {
        const isActive =
          href === ROUTES.HOME ? pathname === ROUTES.HOME : pathname.startsWith(href)
        return (
          <li
            key={label}
            className={`${isActive ? "bg-main" : "bg-primary"} px-2 py-2 rounded-lg transition-colors`}
          >
            <Link href={href} className="text-md font-bold flex items-center space-x-5">
              <Icon />
              <span>{label}</span>
            </Link>
          </li>
        )
      })}
    </>
  )
}

export default NavLinks
