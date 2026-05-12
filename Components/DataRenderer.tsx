import React from 'react'
import { AlertCircle, MessageSquarePlus, Users, Tag, MessageCircle, Bookmark } from "lucide-react";
import Link from "next/link";
import ROUTES from "@/route";

export type EmptyStateType = "question" | "user" | "tag" | "answer" | "collection";

const emptyStateConfig: Record<EmptyStateType, {
  icon: React.ElementType;
  title: string;
  description: string;
  action?: { label: string; href: string };
}> = {
  question: {
    icon: MessageSquarePlus,
    title: "No threads yet",
    description: "Be the first to start a discussion and get the conversation going.",
    action: { label: "Create the first thread", href: ROUTES.QUESTION_CREATE },
  },
  user: {
    icon: Users,
    title: "No users found",
    description: "No users match your search. Try a different term.",
  },
  tag: {
    icon: Tag,
    title: "No tags yet",
    description: "Tags will appear here as questions are created and categorised.",
  },
  answer: {
    icon: MessageCircle,
    title: "No answers yet",
    description: "Be the first to answer this question and help the community.",
  },
  collection: {
    icon: Bookmark,
    title: "Nothing saved yet",
    description: "Bookmark questions you want to revisit and they'll appear here.",
    action: { label: "Browse threads", href: ROUTES.HOME },
  },
};

export default function DataRenderer({ success, data, errorMessage, emptyState = "question", render }: {
  success: Boolean;
  data: any[];
  errorMessage?: string;
  emptyState?: EmptyStateType;
  render: (data: any[]) => React.ReactElement;
}) {
  if (!success || errorMessage) return <ErrorState message={errorMessage ?? "An unexpected error occurred."} />;
  if (!data || !data.length) return <EmptyState type={emptyState} />;
  return <>{render(data)}</>;
}

/* ---------- Error State ---------- */
function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 mt-6 rounded-2xl border border-red-200 bg-gradient-to-b from-red-50 to-white shadow-sm">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 ring-8 ring-red-50">
        <AlertCircle className="w-8 h-8 text-red-500" strokeWidth={2} />
      </div>
      <h2 className="mt-5 text-xl font-semibold text-gray-900">Something went wrong</h2>
      <p className="mt-2 max-w-md text-center text-sm text-gray-600">
        {message || "We couldn't load the data right now. Please try again in a moment."}
      </p>
    </div>
  );
}

/* ---------- Empty State ---------- */
function EmptyState({ type }: { type: EmptyStateType }) {
  const { icon: Icon, title, description, action } = emptyStateConfig[type];
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 mt-6 rounded-2xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white shadow-sm">
      <div className="relative">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 ring-8 ring-indigo-50">
          <Icon className="w-8 h-8 text-indigo-500" strokeWidth={2} />
        </div>
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-indigo-400 animate-ping" />
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-indigo-500" />
      </div>
      <h2 className="mt-5 text-xl font-semibold text-gray-900">{title}</h2>
      <p className="mt-2 max-w-md text-center text-sm text-gray-600">{description}</p>
      {action && (
        <Link
          href={action.href}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 active:scale-[0.98] transition shadow-sm"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
