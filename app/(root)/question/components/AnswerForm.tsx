'use client'
import Button from '@/Components/Button';
import Editor from '@/Components/Editor';
import { AnswerCreate } from '@/lib/action/AnswerCreate.action';
import ROUTES from '@/route';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

function AnswerForm(params: {questionId: string}) {
    const [content, setContent] = useState('');
    const router = useRouter();

    const submit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log("SUBMIT FIRED - new version");  // ← add this
        const {success,data,message} = await AnswerCreate({questionId:params.questionId, content: content})
        console.log(data?.answer)
        if(success && data){
            toast.success('Answer created successfully!');
            setContent("");
            console.log("content is changed back")
            router.push(ROUTES.DETAIL(params.questionId));
        }
        if(message){
            toast.error(message);
        }
    }
  return (
    <form className='space-y-2' onSubmit={submit}>
        <Editor value={content} onChange={(content)=> setContent(content)} label="Answer Here"/>
        <div className='flex flex-col items-end justify-end'>
            <div className="max-w-48"><Button type="submit">Submit</Button></div>
        </div>
    </form>
  )
}

export default AnswerForm;