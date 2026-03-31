import { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function ButtonLink({
  icon,
  children,
  href,
  variant = "normal",
  ...props
}: {
  icon?: string | StaticImageData;
  children: React.ReactNode;
  variant?: "normal" | "outline";
  href: string;
} ) {
  return (
    <>
      <Link
      href={href}
      {...props}
        className={`px-2 py-2 rounded-lg w-[200px] text-center text-white  ${
          variant === "outline" ? "border-2 border-main" : "bg-main"
        } ${icon ? "flex items-center" : ""} `}
      >
        {icon && (
          <Image
            src={icon}
            alt="icon"
            width={30}
            height={30}
            className="rounded-full mx-2"
          />
        )}
        {children}
      </Link>
    </>
  );
}
export default ButtonLink;
