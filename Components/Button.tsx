import { StaticImageData } from "next/image";
import Image from "next/image";
import React from "react";

function Button({
  icon,
  children,
  variant = "normal",
  ...props
}: {
  icon?: string | StaticImageData;
  children: React.ReactNode;
  variant?: "normal" | "outline";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <>
      <button
      {...props}
        className={`px-2 py-2 rounded-lg w-full text-white  ${
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
      </button>
    </>
  );
}
export default Button;
