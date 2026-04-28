import Link from 'next/link'
import React from 'react'

export default function TagCard({ href, children}: { href:string, children:React.ReactNode}) {
  return (
    <Link href={href}
    className='w-[100px] rounded-xl bg-tertiary px-4 py-2 text-gray-300'>
    {children}
    </Link>
  )
}
