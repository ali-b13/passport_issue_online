import Link from 'next/link'
import React from 'react'
import {formatDate} from "@/utils/helpers"
const Item = ({item}:{item:any}) => {
  console.log(item,'item')
  return (
    <Link href={`my_query/${item._id}`} className='flex flex-col m-2 gap-2 w-full bg-green-200/70 shadow-md rounded-lg p-2 hover:bg-green-300/70'>
        <div className='w-full flex justify-between items-center '>
             <p className='text-green-500'><span className='font-extrabold text-neutral-800'>الاسم</span>:{item.applicationId.full_name}</p>
             <p className='text-green-500'><span className='font-extrabold text-neutral-800'>التاريخ</span> :{formatDate(item.reviewDate)}</p>
        </div>
      <p className='text-green-500'><span className='font-extrabold text-neutral-800'>رقم الطلب </span>:{item._id}</p>
      <p className='text-green-500'><span className='font-extrabold text-neutral-800' >حاله الطلب</span> :{item.status}</p>
      
    </Link>
  )
}

export default Item