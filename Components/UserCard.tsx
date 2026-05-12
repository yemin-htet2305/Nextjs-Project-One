import { IuserDoc } from '@/database/user.model';
import Image from 'next/image'
import Link from 'next/link'
import ROUTES from '@/route'

// Deterministic: same id → same color, every render
function getColorFromId(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  // Fixed saturation/lightness keeps colors readable and consistent
  return `hsl(${hue}, 65%, 55%)`;
}

function UserCard({user}:{user: IuserDoc}) {
  return (
    <div>
      <Link href={ROUTES.PROFILE(user._id.toString())} className='bg-tertiary p-3 rounded-2xl flex flex-col items-center justify-center w-[150px] h-[150px] space-y-3'>
          {user.image? (<Image alt='logo' 
          width={50} 
          height={50} 
          src={user.image?.toString()}/>) : (
             <div
            className="w-[50px] h-[50px] rounded-full"
            style={{ backgroundColor: getColorFromId(user._id.toString()) }}
          />
          )}
          <h1>{user.name}</h1>
      </Link>
    </div>
  )
}

export default UserCard;