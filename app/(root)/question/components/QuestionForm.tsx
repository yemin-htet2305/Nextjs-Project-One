'use client'
import Editor from '@/Components/Editor'
import { useState } from 'react'


export default function QuestionForm() {
    const [value, setValue] = useState('')
  return (
    <>
    {value}
    <Editor value={value} onChange={(value)=> setValue(value)} label="Any Question?"/>
    </>
  )
}
