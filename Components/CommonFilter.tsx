'use client'

import React from "react";
import queryString from "query-string";
import { useRouter,useSearchParams } from "next/navigation";

interface Filter{
    name: string;
    value: string;
}

function CommonFilter({filters,dvalue}:{filters: Filter[],dvalue: string}) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const defaultValue = searchParams.get('filter')|| dvalue || "";
    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        const currentQuery = queryString.parse(window.location.search);
        const updatedQuery = {...currentQuery, filter: selectedValue};
        const url = queryString.stringifyUrl({
            url: window.location.pathname,
            query: updatedQuery
        },{skipNull: true, skipEmptyString: true})
        router.push(url);
    }
  return (
    <div className='p-3'>
        <select value={defaultValue} onChange={handleFilterChange}
        className='bg-tertiary px-5 py-2 outline-none rounded-xl'
        >
            {filters.map((filter)=> (
                <option  className="outline-none border-none rounded-2xl"
                value={filter.value} 
                key={filter.value}>{filter.name}</option>
            ))}
        </select>
    </div>
  )
}

export default CommonFilter;