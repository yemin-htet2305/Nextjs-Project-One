'use client'
import Button from '@/Components/Button'
import Editor from '@/Components/Editor'
import Input from '@/Components/Input'
import TagCard from '@/Components/TagCard'
import { Iquestion } from '@/database/question.model'
import { QuestionCreate } from '@/lib/action/QuestionCreate.action'
import ROUTES from '@/route'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from "react-toastify";
import RemoveableTagCard from './RemoveableTagCard'


export default function QuestionForm({ isEdit = false, questionData }: { isEdit?: boolean; questionData?: Iquestion }) {
    const [content, setContent] = useState(questionData?.content || '');
    const [title, setTitle] = useState(questionData?.title || '');
    const [tags,setTags] = useState<string[]>(questionData?.tags?.map(tag => tag.name) || []);
    const [newTag,setNewTag] = useState('');
    const [error,setError] = useState('');
    const router = useRouter();

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
    const removeTag = (tagToRemove: string) => {
      setTags((prevTags) => prevTags.filter(tag => tag !== tagToRemove));
    }

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try{
        if(isEdit && questionData) {
          let result = await QuestionCreate({title,content,tags});
          console.log('QuestionCreate result:', result); // debug
          if(result.success && result.data) {
            toast.success('Question updated successfully!');
            console.log('Redirecting to:', ROUTES.DETAIL(result.data._id)); // debug
            router.push(ROUTES.DETAIL(result.data._id));
        }
        return;
        }
        let result = await QuestionCreate({title,content,tags});
        console.log('QuestionCreate result:', result); // debug
        if(result.success && result.data) {
          toast.success('Question created successfully!');
          console.log('Redirecting to:', ROUTES.DETAIL(result.data._id)); // debug
          router.push(ROUTES.DETAIL(result.data._id));
        }
      }
      catch(err){
        if (err instanceof Error) {
                toast.error(err.message);
              }
      }
    }
  return (
    <form className='space-y-2' onSubmit={submit}>
      <h1 className='font-bold text-2xl'>Ask a New Question</h1>
      <Input label='Title' value={title} onChange={(e) => setTitle(e.target.value)} text='Describe your title in short way here.'/>
      <Editor value={content} onChange={(content)=> setContent(content)} label="Any Question?"/>
      <Input value={newTag} onKeyDown={HandleKeyPress} onChange={(e) => setNewTag(e.target.value)} label='Tags' text='Press enter to add a tag.'/>
      {error && <p className='text-red-500'>{error}</p>}
      <div className='my-5 space-x-3 flex flex-row flex-wrap'>
        {tags.map((tag,i)=> 
        (
         <RemoveableTagCard key={tag} onRemove={() => removeTag(tag)}>
           {tag}
         </RemoveableTagCard>
        )
        )}
      </div>
      <Button type="submit">{isEdit ? 'Update' : 'Create'}</Button>
    </form>
  )
}
