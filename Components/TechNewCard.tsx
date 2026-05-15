import Link from "next/link";
import { AiOutlineLike } from "react-icons/ai";
import { LiaComments } from "react-icons/lia";

export interface DevToArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  cover_image: string | null;
  social_image: string;
  readable_publish_date: string;
  tag_list: string[];
  user: {
    name: string;
    username: string;
    profile_image: string;
  };
  reading_time_minutes: number;
  public_reactions_count: number;
  comments_count: number;
}

export default function TechNewCard({ article }: { article: DevToArticle }) {
  return (
    <div className="bg-card w-full rounded-xl overflow-hidden flex flex-col sm:flex-row">
      {article.cover_image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={article.cover_image}
          alt={article.title}
          className="w-full sm:w-56 sm:h-auto h-48 object-cover shrink-0"
        />
      )}
      <div className="p-5 space-y-3 flex flex-col justify-between flex-1">
        <div className="space-y-3">
          <Link
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-bold hover:text-main block"
          >
            {article.title}
          </Link>

          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
            {article.description}
          </p>

          {article.tag_list.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {article.tag_list.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.user.profile_image}
              alt={article.user.name}
              width={28}
              height={28}
              className="rounded-full object-cover shrink-0"
            />
            <span className="text-sm">
              {article.user.name} · {article.readable_publish_date}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <AiOutlineLike />
              <span>{article.public_reactions_count}</span>
            </div>
            <div className="flex items-center gap-1">
              <LiaComments />
              <span>{article.comments_count}</span>
            </div>
            <span>{article.reading_time_minutes} min read</span>
          </div>
        </div>
      </div>
    </div>
  );
}
