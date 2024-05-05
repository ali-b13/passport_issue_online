import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaXmark } from 'react-icons/fa6'
type PopUpProps={
  title:string,
  content:string,
  warning?:boolean,
  redirectedPath?:string
}
const PopUp :React.FC<PopUpProps> = ({title,content,warning ,redirectedPath}) => {
    const [closePopUp,setClosePopUp]=useState(false)
    const router=useRouter()
    const handleOnClick=()=>{
      if(redirectedPath){

      setClosePopUp(prev=>!prev)
      router.push(`${redirectedPath}`)
      }
    }
    if(closePopUp==true){
        return null;
    }
  return (
    <div className='absolute inset-0 h-full w-full bg-neutral-800/80 flex justify-center items-center'>
           <div className='relative h-[50vh] w-2/3 md:w-2/4  bg-white text-black flex  flex-col items-center p-4 rounded-lg'>
             <div className={` ${warning?"text-red-400 bg-red-100" :"text-green-900 bg-green-300"} border-2 w-2/4 text-center mb-2 p-2 text-lg`}>{title}</div>
             <button onClick={redirectedPath?handleOnClick:()=>setClosePopUp(prev=>!prev)} className='absolute left-1 text-neutral-400 top-1 border-2 '>
             <FaXmark size={30}/>
             </button>
             <div className='w-full text-neutral-800 p-3 font-extrabold text-lg line-clamp-6 text-pretty m-2'>{content}</div>
           </div>
    </div>
  )
}

export default PopUp