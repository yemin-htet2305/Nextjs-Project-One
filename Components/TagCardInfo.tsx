import { ItagDoc } from '@/database/tag.model'
import Image from 'next/image'
import Link from 'next/link'

function TagCardInfo({tag}:{tag: ItagDoc}) {
  return (
    <div>
      <Link href={`tags/${tag._id}`} className='bg-tertiary p-3 rounded-2xl flex flex-col items-center justify-center w-[150px] h-[150px]'>
          <Image alt='logo' width={80} height={80} src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tag.name.toLocaleLowerCase()}/${tag.name.toLocaleLowerCase()}-original.svg`}/>
          <h1>{tag.name} - ({tag.questions})</h1>
      </Link>
    </div>
  )
}

export default TagCardInfo;