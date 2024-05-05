import React from 'react'

const ProgressBar = ({progressLevel}:any) => {
    const progressArray=Array.from({length:progressLevel},(_,index)=>index+1)
  return (
    <div dir='ltr' className=' flex border-2 w-40 h-5 bg-slate-600 rounded-lg overflow-hidden'>
        {
            progressArray.map((_,index)=>{
                return (
                    <div key={index} className='bg-green-600 border-r-2 w-9 h-full border-gray-300'></div>
                )
            })
        }
       
    </div>
  )
}

export default ProgressBar