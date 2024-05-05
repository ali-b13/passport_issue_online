import React from 'react'
type InputProps={
    id:string,
    val1:string,
    val2:string,
      label?:string,
      classname?:string,
      register:any,
      errors:any
  }
const RadioInput:React.FC<InputProps> = ({val1,val2,label,classname,register,errors,id}) => {
  return (
    <div className='mb-4  w-full text-neutral-700  '>
        <p className='my-4'>{label}</p>
      <div className='flex gap-3 items-center'>
        <input
        defaultValue={val1}
        className='w-6 h-6 text-blue-600 bg-gray-100 border-gray-300
         focus:ring-blue-500  focus:ring-2  '
          type="radio"
          {...register(id)}
        />
        <label id={id} className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
         {val1}
      </label>
       
      
        <input
        value={val2}
        className='w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 '
          type="radio"
          {...register(id)}
        />
        <label>
        {val2}
      </label>
      
      </div>

      <p className="text-red-500 text-sm m-2">{errors[id]?.message}</p>
    </div>
  )
}

export default RadioInput