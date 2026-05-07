import React from 'react'
import {MDXRemote} from 'next-mdx-remote/rsc'
import {Code} from 'bright'

Code.theme = {
    light: 'github-light',
    dark: 'github-dark',
    lightSelector: 'html.light'
}

export default function Preview({content}: {
    content: string
}) {
  return (
    <div className='prose max-w-none prose-headings:text-gray-200'>
        <MDXRemote source={content} components={{
            pre: (props) => {
                return <Code {...props} lineNumbers className='shadow-light-200' />
            }
        }}>

        </MDXRemote>
        
    </div>
  )
}