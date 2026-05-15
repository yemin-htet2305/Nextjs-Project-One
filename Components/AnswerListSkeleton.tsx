function AnswerCardSkeleton() {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 animate-pulse">
      {/* Header */}
      <header className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          <div className="flex flex-col gap-1.5">
            <div className="h-3.5 w-28 rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-3 w-20 rounded bg-zinc-200 dark:bg-zinc-700" />
          </div>
        </div>
        <div className="h-8 w-20 rounded-full bg-zinc-200 dark:bg-zinc-700" />
      </header>

      {/* Body */}
      <div className="space-y-2">
        <div className="h-3.5 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-3.5 w-5/6 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-3.5 w-4/6 rounded bg-zinc-200 dark:bg-zinc-700" />
      </div>

      {/* Footer */}
      <footer className="mt-5 border-t border-zinc-100 pt-4 dark:border-zinc-800">
        <div className="h-8 w-36 rounded-xl bg-zinc-200 dark:bg-zinc-700" />
      </footer>
    </article>
  );
}

function AnswerListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="mt-8 space-y-5">
      <div className="h-7 w-40 rounded bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
      <div className="flex flex-col space-y-5">
        {Array.from({ length: count }).map((_, i) => (
          <AnswerCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export default AnswerListSkeleton;
