'use client';
import { useRouter,useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useState } from "react";

export default function Filters() {
    const seaerchParams = useSearchParams();
    const[filter,setFilter] = useState(seaerchParams.get('filter') || '');
    const router = useRouter();
    const handleClick = (selectedFilter: string) => {
        if (filter === selectedFilter) {
            setFilter('');
        }else{
            setFilter(selectedFilter);
            const currentQuery = queryString.parse(window.location.search);
            const updatedQuery = {...currentQuery, filter: selectedFilter};
            const url = queryString.stringifyUrl({
                url: window.location.pathname,
                query: updatedQuery
            },{skipNull: true, skipEmptyString: true});
            router.push(url);
        }
    };

  return (
    <div className="flex space-x-5 p-5">
        <button onClick={() => handleClick('React')} 
        className={`p-2 rounded-lg w-[100px] text-gray-200 ${filter === 'React' ? 'bg-main' : 'bg-tertiary'}`}>
            React
        </button>
        <button onClick={() => handleClick('Vue')} 
        className={`p-2 rounded-lg w-[100px] text-gray-200 ${filter === 'Vue' ? 'bg-main' : 'bg-tertiary'}`}>
            Vue
        </button>
        <button onClick={() => handleClick('Angular')} 
        className={`p-2 rounded-lg w-[100px] text-gray-200 ${filter === 'Angular' ? 'bg-main' : 'bg-tertiary'}`}>
            Angular
        </button>
    </div>
  )
}
