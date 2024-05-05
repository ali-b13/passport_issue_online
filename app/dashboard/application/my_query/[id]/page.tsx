import FileInput from '@/app/components/inputs/file-input'
import React, { Suspense } from 'react'
import ExtraDocuments from '../ui/ExtraDocuments'
import { getReviewById } from '@/app/actions/queries/myPassport'
import { notFound } from 'next/navigation'
import { formatDate } from '@/utils/helpers'

const extraInfo = async({params}:{params:{
    id:string
}}) => {
    const review =await getReviewById("66252c3ba3176d4008186ec6",params.id)
    if(!review){
        notFound()
    }
  return (
    <section  className={"bg-neutral-400/70 flex min-h-[70vh] bg-gradient-to-r from-green-100 to-green-200  "} dir='rtl' >
       <Suspense fallback={"loading..."}>
          {review&&    <div  className=' flex flex-col w-full  gap-4  shadow-md  p-2 my-1 text-lg border-y-2 '>
         <div className='w-full flex justify-between items-center '>
             <p className='text-green-900'><span className='font-extrabold text-neutral-800'>الاسم</span > :{review?.applicationId.full_name}</p>
             <p className='text-green-900'><span className='font-extrabold text-neutral-800'>التاريخ</span> :{formatDate(review.reviewDate)}</p>
        </div>
      <p className='text-green-900'><span className='font-extrabold text-neutral-800'>رقم الطلب  </span> :{review._id} </p>
      <p className='text-green-900'><span className='font-extrabold text-neutral-800' >حاله الطلب </span> :{review.status} </p>
      <p className='text-green-900'><span className='font-extrabold text-neutral-800'> الفرع </span> : {review.branch} </p>
      <div className='flex flex-col '>
      <span className='font-extrabold text-neutral-800'> ملاحظات من المكتب </span>
      <textarea className='bg-green-100/70 text-green-900 w-full md:w-2/4 ' disabled={true} style={{resize:'none',height:100}}  value={`${review.comments?review.comments:"لاتوجد اوامر من المكتب"}`}/>
      </div>
      <span className={` font-extrabold text-neutral-800 ${review.requiredDocuments.length?"":"line-through"}`}>اضافه الملفات المطلوبه من المكتب </span>
    
     <div className='w-full md:w-2/4 '>
     <ExtraDocuments requiredDocs={review.requiredDocuments}/>
     </div>
    </div>
    }
       </Suspense>
  
    </section>
  )
}

export default extraInfo