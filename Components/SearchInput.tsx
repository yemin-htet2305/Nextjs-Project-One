'use client'
import React, { useEffect } from 'react'
import Input from './Input'
import queryString from 'query-string'
import { useSearchParams,useRouter } from 'next/navigation'
import { useDebounce } from 'use-debounce'

export default function SearchInput() {
  const router = useRouter()
  const searchParams = useSearchParams();
  let [search,setSearch] = React.useState(searchParams.get('search') || '')
  const [debouncedSearch] = useDebounce(search,500);
  useEffect(() => {
    const currentQuery = queryString.parse(window.location.search)
    const updatedQUery = {...currentQuery, search:debouncedSearch}
    const url = queryString.stringifyUrl({
      url: window.location.pathname,
      query: updatedQUery
    },{skipNull: true, skipEmptyString: true});
    router.push(url);
    
  },[debouncedSearch,router])
  return (
    <Input placeholder='search anything globally' value={search} onChange={(e) => setSearch(e.target.value)}/>
  )
}
