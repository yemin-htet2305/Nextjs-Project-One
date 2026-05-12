import Image from "next/image";
import { AiOutlineLike } from "react-icons/ai";
import { LiaComments } from "react-icons/lia";
import { FaEye } from "react-icons/fa";
import TagCard from "./TagCard";
import { IquestionDoc } from "@/database/question.model";
import Link from "next/link";
import ROUTES from "@/route";
import { ItagDoc } from "@/database/tag.model";
import { IuserDoc } from "@/database/user.model";

function getColorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${Math.abs(hash) % 360}, 65%, 55%)`;
}

export default function ThreadCard({question} : {question : IquestionDoc}) {
  const author = question.author as unknown as IuserDoc;
  return (
    <div className="bg-card w-full rounded-xl p-5 space-y-5">
      <Link href={ROUTES.DETAIL(question._id.toString())} className="text-2xl font-bold hover:text-main block">{question.title}</Link>
      <div className="space-x-2">
        {(question.tags as unknown as ItagDoc[])?.map((tag) => (
          <TagCard key={tag._id.toString()} href={ROUTES.TAG(tag._id.toString())}>{tag.name}</TagCard>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex space-x-3 items-center">
          {author?.image ? (
            author.image.startsWith("/") ? (
              <Image
                src={author.image}
                alt={author.name}
                width={30}
                height={30}
                className="rounded-full object-cover shrink-0"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={author.image}
                alt={author.name}
                width={30}
                height={30}
                className="rounded-full object-cover shrink-0"
                referrerPolicy="no-referrer"
              />
            )
          ) : (
            <div
              className="w-7.5 h-7.5 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
              style={{ backgroundColor: getColorFromName(author?.name ?? "?") }}
            >
              {(author?.name ?? "?")[0].toUpperCase()}
            </div>
          )}
          <span>{author?.name} · asked 3 minute ago</span>
        </div>
        <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
                <AiOutlineLike />
                <span>{question.upvotes}k Likes</span>
            </div>
            <div className="flex items-center space-x-2">
                <LiaComments />
                <span>{question.answers} Answers</span>
            </div>
            <div className="flex items-center space-x-2">
                <FaEye />
                <span>{question.views} Views</span>
            </div>
        </div>
      </div>
    </div>
  );
}
