'use client'
import { ToggleBookmarkAction } from '@/lib/action/ToggleBookmarkAction.action';
import { useState } from 'react'
import { toast } from 'react-toastify';

function ToggleBookmarkButton({questionId,save}:{questionId: string,save: Boolean}) {
    const [saved,setSaved]  = useState<Boolean>(save);

    const handleSave = async() => {
      try{
        const {success,data,message,detail} = await ToggleBookmarkAction({questionId: questionId});
        if(success && data){
          setSaved(data.saved);
          toast.success("save toggle successfully!")
        }
      }catch(e){
        if(e instanceof Error){
          toast.error(e.message);
        }
      }
    }
  return (
    <>
    {!saved? (<button onClick={handleSave} type='button' className='bg-main py-3 px-5 rounded-2xl'>
        Save
        </button>): (
            <button onClick={handleSave} type='button' className='py-3 px-5 rounded-2xl border-[1px] border-main'>
                Unsave
        </button>)}
    </>
  )
}

export default ToggleBookmarkButton