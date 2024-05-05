import React from 'react'

 type SelectProps={
    id:string,
    options:any,
    label:string,
    register:any,
    errors:any
 }

const SelectButton :React.FC<SelectProps>= ({options,label,register,id,errors}) => {
 
  return (
    <>
    
        <select {...register(id)} className={` text-neutral-700 w-full text-center  m-0  border-2 rounded-lg ${errors[id]?"border-red-600":"border-green-600 "}`}>
            <option  disabled value={""}>{label}</option>
            {
                options.map((option:any)=>{
                    return(
                        <option  key={option.label} value={option.label}>{option.label}</option>
                    )
                })
            }
            
        </select>  
        <p className="text-red-500 text-sm">{errors[id]?.message}</p>
        </>
  )
}

export default SelectButton