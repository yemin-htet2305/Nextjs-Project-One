'use client'

import { Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import ROUTES from '@/route'

import {Button} from './ui/button'
import { AlertDialogTrigger,
   AlertDialogContent,
    AlertDialogHeader,
     AlertDialogTitle,
      AlertDialogDescription,
       AlertDialogFooter,
        AlertDialogCancel,
         AlertDialogAction,
        AlertDialog } from './ui/alert-dialog'
import { DeleteQuestion } from '@/lib/action/DeleteQuestion.action'
import { toast } from 'react-toastify'
import { DeleteAnswer } from '@/lib/action/DeleteAnswer.action'


interface EditDeleteActionsProps {
  type: 'question' | 'answer'
  typeId: string
  showActions: boolean
}

export default function EditDeleteActions({ type, typeId, showActions }: EditDeleteActionsProps) {
  if (!showActions) return null;

  const deleteAction = async () => {
    let successValue;
    let msg;
    let d;
    if(type === "question"){
      const {success,message,detail} = await DeleteQuestion({questionId: typeId});
      successValue = success;
      msg = message;
      d = detail;
    }else{
      const {success,message,detail} = await DeleteAnswer({answerId: typeId});
      successValue = success;
      msg = message;
      d = detail;
    }

    if(successValue){
      toast.success("Delete action finised successfully");
    }
    if(msg && d){
      toast.error(`Error in deleting ${msg}: ${d}`)
    }
  }

  return (
    <div className="flex items-center gap-1">
      {type === "question" && 
      <Link
        href={ROUTES.QUESTION_EDIT(typeId)}
        className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
      >
        <Pencil className="h-3.5 w-3.5" />
        Edit
      </Link> }

      <AlertDialog>
        <AlertDialogTrigger
        className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-rose-500 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 dark:hover:text-rose-400"
        render={<Button  variant="outline" />}>
          <Trash2 className="h-3.5 w-3.5" />
              Delete
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account
              from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
            onClick={deleteAction}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-rose-500 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 dark:hover:text-rose-400"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
