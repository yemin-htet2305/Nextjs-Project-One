import LeftSideBar from "@/Components/LeftSideBar";
import Navbar from "@/Components/Navbar";
import RightSideBar from "@/Components/RightSideBar";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="flex">
        <LeftSideBar />
        <div className="w-3/5">{children}</div>
        <RightSideBar />
      </div>
    </>
  );
}
