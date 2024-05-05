import Title from '@/app/components/title'
import React, { Suspense } from 'react'
import OverViewItem from '../new_passport/ui/form/overview-item'
import { getReviewApplication } from '@/app/actions/queries/myPassport'

const myQueryPage = async() => {
 const reviews=await getReviewApplication("66252c3ba3176d4008186ec6")
 console.log(reviews,'reviews')
  return (
    <div dir='rtl' className='bg-gradient-to-r from-neutral-300 to-green-50 '>
      <Title large title='طلباتي'/>
      <div className='w-full md:w-3/6 min-h-[55vh]'>
        <Suspense fallback={"loading..."}>
          {
            reviews.length>0?<>
            {
              reviews.map((review:any)=>{
                return <OverViewItem item={review}/>
              })
            }
            <p className='border-b-2 border-neutral-400 mt-5'></p>
            </> :
            <div className='mt-6 text-neutral-600 text-2xl mr-2 '>لاتوجد طلبات للان</div>
          }
        </Suspense>

      </div>
  
    </div>
  )
}

export default myQueryPage