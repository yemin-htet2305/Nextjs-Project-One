"use client"

import { useRouter } from "next/navigation"
import queryString from "query-string"

function Pagination({isNext,currentPage}:{
    isNext: Boolean,
    currentPage: number
}) {

    const router = useRouter();
    const handleClick = (type: "prev" | "next") => {
        const page = type === "prev"? currentPage-1: currentPage+1;
        const currentQuery = queryString.parse(window.location.search);
        const updatedQuery = {...currentQuery,page};
        const url = queryString.stringifyUrl({
            url: window.location.pathname,
            query: updatedQuery
    });
    router.push(url);
    }
    const hasPrev = currentPage > 1;
  return (
    <div className='w-full pt-3 flex items-center justify-center gap-5'>  
        <button 
        disabled={!hasPrev}
        onClick={()=>handleClick("prev")}
        className={`px-5 py-2 bg-main rounded-2xl ${currentPage > 1? 'cursor-pointer' : "cursor-not-allowed opacity-50"}`}>
            Previous
        </button>
        <div>{currentPage}</div>
        <button 
        disabled={!isNext}
        onClick={()=>handleClick("next")}
        className={`px-5 py-2 bg-main rounded-2xl ${isNext? 'cursor-pointer' : "cursor-not-allowed opacity-50"}`}>
            Next
        </button>
    </div>
  )
}

export default Pagination;