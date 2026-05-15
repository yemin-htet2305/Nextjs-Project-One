function TechNewCardSkeleton() {
  return (
    <div className="bg-card w-full rounded-xl overflow-hidden animate-pulse">
      <div className="w-full h-44 bg-zinc-200 dark:bg-zinc-700" />
      <div className="p-5 space-y-3">
        <div className="h-5 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="space-y-1.5">
          <div className="h-3.5 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-3.5 w-5/6 rounded bg-zinc-200 dark:bg-zinc-700" />
        </div>
        <div className="flex gap-2">
          <div className="h-5 w-14 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-5 w-16 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-5 w-12 rounded-full bg-zinc-200 dark:bg-zinc-700" />
        </div>
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-3.5 w-36 rounded bg-zinc-200 dark:bg-zinc-700" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-3.5 w-8 rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-3.5 w-8 rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-3.5 w-16 rounded bg-zinc-200 dark:bg-zinc-700" />
          </div>
        </div>
      </div>
    </div>
  );
}

function TechNewSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <TechNewCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default TechNewSkeleton;
