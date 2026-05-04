import Image from "next/image";
import profile from "@/public/profile.jpg";
import { AiOutlineLike } from "react-icons/ai";
import { LiaComments } from "react-icons/lia";
import { FaEye } from "react-icons/fa";
import TagCard from "./TagCard";
import { IquestionDoc } from "@/database/question.model";

export default function ThreadCard({question} : {question : IquestionDoc}) {
  return (
    <div className="bg-card w-full rounded-xl p-5 space-y-5">
      <h1 className="text-2xl font-bold">{question.title}</h1>
      <div className="space-x-2">
        {question.tags?.map((tag,i) => (
          <TagCard key={i} href = {`filters/${tag.name.toLowerCase()}`}>{tag.name}</TagCard>
        ))}
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
          <span>{question.author?.name} · asked {question.createdAt.toLocaleDateString()}</span>
        </div>
        <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
                <AiOutlineLike />
                <span>{question.upvotes}k Likes</span>
            </div>
            <div className="flex items-center space-x-2">
                <LiaComments />
                <span>{question.answers}k Answers</span>
            </div>
            <div className="flex items-center space-x-2">
                <FaEye />
                <span>{question.views}k Views</span>
            </div>
        </div>
      </div>
    </div>
  );
}
