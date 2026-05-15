function loading() {
  return (
    <>
      {/* header row: title + filter */}
      <div className="flex items-center justify-between p-2 mb-5">
        <div className="h-9 w-32 bg-gray-200 rounded-md animate-pulse" />
        <div className="h-9 w-36 bg-gray-200 rounded-md animate-pulse" />
      </div>

      {/* tag grid — 6 columns matching grid-cols-6 */}
      <div className="grid grid-cols-6 space-y-5 space-x-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="bg-gray-200 rounded-2xl w-37.5 h-37.5 animate-pulse"
          />
        ))}
      </div>

      {/* pagination row */}
      <div className="flex justify-center gap-2 mt-6">
        <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
        <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
        <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
      </div>
    </>
  );
}

export default loading;
