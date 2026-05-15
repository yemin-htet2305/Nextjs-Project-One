function VoteButtonsSkeleton() {
  return (
    <div className="flex space-x-2 text-xs">
      <div className="flex space-x-1 border-[1px] p-3 rounded-xl border-gray-200 animate-pulse">
        <div className="h-3.5 w-3.5 bg-gray-200 rounded" />
        <div className="h-3.5 w-14 bg-gray-200 rounded" />
      </div>
      <div className="flex space-x-1 border-[1px] p-3 rounded-xl border-gray-200 animate-pulse">
        <div className="h-3.5 w-3.5 bg-gray-200 rounded" />
        <div className="h-3.5 w-16 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

export default VoteButtonsSkeleton;
