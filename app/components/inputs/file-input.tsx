import Image from 'next/image'
import React, { useState } from 'react'
import { FiFileText } from 'react-icons/fi'
type InputProps={
    id:string,
    value:any,
      label?:string,
      classname?:string,
      register:any,
      errors:any,
      disabled?:boolean|undefined
  
  }
const FileInput :React.FC<InputProps>= ({id,label,errors,register,classname,value,disabled}) => {
  return (
      <div>
        <div className={`text-neutral-600 ${disabled?"line-through":""}`}>{label}</div>
          <div  className={` flex justify-between items-center w-full border-2   border-slate-500 rounded-lg p-2 text-neutral-600 `}>
           <label className={`w-full  ${disabled?"cursor-not-allowed":"cursor-pointer"}`}  htmlFor={id}>
           {
            value? "تم تحميل الملف":"   اضغط لتحميل الملف"
           }
              </label>
           <FiFileText/>
           <input disabled={disabled} {...register(id)} id={id} type='file' className='hidden' />
        </div>
        <p className="text-red-500 text-sm m-2">{errors[id]?.message}</p>
        {
            value&&(
                <Image className='border-2 rounded-md  border-neutral-600 w-2/4 md:w-1/4' src={URL.createObjectURL(value[0])||""} alt='file' width={50} height={50}/>
            )
        }
     </div>
  )
}

export default FileInput