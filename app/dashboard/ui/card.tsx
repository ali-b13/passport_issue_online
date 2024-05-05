import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
const Card = ({item}:{item:any}) => {
  return (
    <Link href={item.href} className='bg-gradient-to-tl from-emerald-800 to-green-500 flex items-center justify-evenly h-44 m-2 
     text-white rounded-lg shadow-lg font-extrabold p-2 hover:bg-green-600
     hover:transition-all hover:duration-300 hover:cursor-pointer
   
     '>
       <Image className='rounded-2xl select-none'  src={item.icon} alt={item.name} width={90} />
       <span className='text-3xl select-none'>{item.name}</span>
    </Link>
  )
}

export default Card