'use client'

import { VoteAction } from '@/lib/action/VoteAction.action';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { use, useState } from 'react'
import { toast } from 'react-toastify';

function VoteButtons({type,typeId,initialUpvote,initialDownvote,promiseGetVote}:{
  promiseGetVote: Promise<{
    success:Boolean,
    data?:{
        userVoteType: "upvote"|"downvote"|null;
    },
    message?: string,
    detail?: object | null

}>;
  type: "question" | "answer";
  typeId: string;
  initialUpvote: number;
  initialDownvote:number;
}) {
  const{success,data,message,detail} = use(promiseGetVote);
  const [upvote,setUpvote] = useState(initialUpvote);
  const [downvote,setDownvote] = useState(initialDownvote);
  const [vote,setVote] = useState<'upvote'|'downvote'|null>(
    success? data?.userVoteType ?? null : null
  );

  

  const handleVote = async (voteType: "upvote"|"downvote")=>{
    const {success,data,message,detail} = await VoteAction({type: type,typeId:typeId,voteType});
    if(success && data){
      setUpvote(data.upvotes);
      setDownvote(data.downvotes);
      setVote(data.voteType);
    }
    if(message){
      toast.error(message);
    }
  }
  return (
    <div className='flex space-x-2 text-xs'>
      <button onClick={()=> handleVote("upvote")} className={`flex space-x-1 border-[1px] p-3 rounded-xl 
                        ${vote === "upvote"? "border-emerald-500 text-emerald-500":""} `}>
        <ChevronUp className="h-3.5 w-3.5 text-emerald-500" />
          <span>{upvote} upvotes</span>
      </button>
      <button onClick={()=> handleVote("downvote")} className={`flex space-x-1 border-[1px] p-3 rounded-xl
                        ${vote === "downvote"? "text-rose-500 border-rose-500":""}`}>
        <ChevronDown className="h-3.5 w-3.5 text-rose-500" />
          <span>{downvote} downvotes</span>
      </button>

    </div>
  )
}

export default VoteButtons;