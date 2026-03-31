'use client'
import Button from '@/Components/Button'
import Editor from '@/Components/Editor'
import Input from '@/Components/Input'
import TagCard from '@/Components/TagCard'
import { useState } from 'react'


export default function QuestionForm() {
    const [value, setValue] = useState('');
    const [tags,setTags] = useState<string[]>(['React','Vue']);
    const [newTag,setNewTag] = useState('');
    const [error,setError] = useState('');

    let HandleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if(e.key === 'Enter') {
        if(!tags.includes(newTag.trim())) {
          setTags([...tags, newTag.trim()]);
          setNewTag('');
        }else{
          setError('You already have a tag with this name.');
        }
      }

    }
  return (
    <div className='space-y-2'>
      <h1 className='font-bold text-2xl'>Ask a New Question</h1>
      <Input label='Title' text='Describe your title in short way here.'/>
      <Editor value={value} onChange={(value)=> setValue(value)} label="Any Question?"/>
      <Input value={newTag} onKeyDown={HandleKeyPress} onChange={(e) => setNewTag(e.target.value)} label='Tags' text='Press enter to add a tag.'/>
      {error && <p className='text-red-500'>{error}</p>}
      <div className='my-5 space-x-3'>
        {tags.map((tag,i)=> 
        (
          <TagCard href={`filters/${tag.toLowerCase()}`}>{tag}</TagCard>
        )
        )}
      </div>
      <Button>Create</Button>
    </div>
  )
}
