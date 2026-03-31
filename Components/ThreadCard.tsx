import Image from "next/image";
import profile from "@/public/profile.jpg";
import { AiOutlineLike } from "react-icons/ai";
import { LiaComments } from "react-icons/lia";
import { FaEye } from "react-icons/fa";
import TagCard from "./TagCard";

export default function ThreadCard() {
  return (
    <div className="bg-card w-full rounded-xl p-5 space-y-5">
      <h1 className="text-2xl font-bold">What is vue js? how does it work?</h1>
      <div className="space-x-2">
        <TagCard href="filters/react">React</TagCard>
        <TagCard href='filters/vue'>Vue</TagCard>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex space-x-3 items-center">
          <Image
            src={profile}
            alt="profile"
            width={30}
            className="rounded-full "
            height={30}
          />
          <span>Ye Min Htet . asked 3 minutes ago</span>
        </div>
        <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
                <AiOutlineLike />
                <span>1.2k Likes</span>
            </div>
            <div className="flex items-center space-x-2">
                <LiaComments />
                <span>1.2k Answers</span>
            </div>
            <div className="flex items-center space-x-2">
                <FaEye />
                <span>1.2k Views</span>
            </div>
        </div>
      </div>
    </div>
  );
}
