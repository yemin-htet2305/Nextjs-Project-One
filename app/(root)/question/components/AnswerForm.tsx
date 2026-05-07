'use client'
import Button from '@/Components/Button';
import Editor from '@/Components/Editor';
import { AnswerCreate } from '@/lib/action/AnswerCreate.action';
import { GetAiAnswerAction } from '@/lib/action/GetAiAnswerAction.action';
import ROUTES from '@/route';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

function AnswerForm(params: {
    questionId: string,
    questionTitle: string,
    questionContent: string,
    }) {
    const [content, setContent] = useState('');
    const router = useRouter();
    const [loading,setLoading] = useState(false);

    const generateAiAnswer  = async ()=> {
         setLoading(true);
        const {success,data,message,detail} = await GetAiAnswerAction({
           
            title: params.questionTitle,
            content: params.questionContent,
            answer: content
        })
        if(success && data){
            const {answer = ""} = data || {};
            setContent(answer)
            toast.success("AI answer successfully Generated");
             setLoading(false);
        }
        if(!success && message){
            toast.error(message);
             setLoading(false);
        }
    }

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
        <Editor value={content} onChange={(content)=> {setContent(content);}} label="Answer Here"/>
        <div className='flex flex-row items-center justify-end gap-2'>
                    <div className="flex items-center justify-center w-full">
                        {content.length>10 ? <Button variant='outline'  
                        type="button"
                        onClick={() => generateAiAnswer()}>
                            {loading? "Loading...": "Generate Ai Answer"}
                            </Button> : ""}
                    </div>
                    <div className="flex items-center justify-center w-full">
                        <Button  type="submit">Submit</Button>
                    </div>
        </div>
    </form>
  )
}

export default AnswerForm;