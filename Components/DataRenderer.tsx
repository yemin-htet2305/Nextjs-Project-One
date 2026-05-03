import React from 'react'
import { AlertCircle, Inbox, RefreshCw, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function DataRenderer({success,data,errorMessage,render}:{
    success: Boolean,
    data: any[],
    errorMessage?: string | undefined,
    render: (data: any[]) => React.ReactElement

}) {
     if(errorMessage){
         return <ErrorState message={errorMessage} />;
    }
    if(!data || !data.length){
        return <EmptyState />;
    }
  return (
    <>
        {render(data)}
    </>
  )
}

/* ---------- Error State ---------- */
function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 mt-6 rounded-2xl border border-red-200 bg-gradient-to-b from-red-50 to-white shadow-sm">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 ring-8 ring-red-50">
        <AlertCircle className="w-8 h-8 text-red-500" strokeWidth={2} />
      </div>
 
      <h2 className="mt-5 text-xl font-semibold text-gray-900">
        Something went wrong
      </h2>
      <p className="mt-2 max-w-md text-center text-sm text-gray-600">
        {message || "We couldn't load your threads right now. Please try again in a moment."}
      </p>
 
      {/* <button
        onClick={() => window.location.reload()}
        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 active:scale-[0.98] transition shadow-sm"
      >
        <RefreshCw className="w-4 h-4" />
        Try again
      </button> */}
    </div>
  );
}
 
/* ---------- Empty State ---------- */
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 mt-6 rounded-2xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white shadow-sm">
      <div className="relative">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 ring-8 ring-indigo-50">
          <Inbox className="w-8 h-8 text-indigo-500" strokeWidth={2} />
        </div>
        {/* tiny floating dot for a bit of life */}
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-indigo-400 animate-ping" />
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-indigo-500" />
      </div>
 
      <h2 className="mt-5 text-xl font-semibold text-gray-900">
        No threads yet
      </h2>
      <p className="mt-2 max-w-md text-center text-sm text-gray-600">
        Looks pretty quiet here. Be the first to start a discussion and get the
        conversation going.
      </p>
 
      <Link
        href="/question/create"
        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 active:scale-[0.98] transition shadow-sm"
      >
        <PlusCircle className="w-4 h-4" />
        Create the first thread
      </Link>
    </div>
  );
}