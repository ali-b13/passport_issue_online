import { FieldErrors, RegisterOptions } from "react-hook-form"

type InputProps={
  id:string,
    label?:string,
    classname?:string,
    register:any,
    errors:any
    type:"text"|"password"|"email"|"number"|"date",
    disabled?:boolean|undefined

}
const InputText:React.FC<InputProps> = ({label,classname,register,id,errors,type,disabled}) => {
  return (
    <div className={classname + "flex flex-col w-full "}>
         <div className={`text-neutral-700  ${disabled?"line-through":""}`}>{label}</div>
      <input disabled={disabled} type={type} {...register(id)} className={`w-full border-2   rounded-lg p-2 ${errors[id]?"border-red-600 outline-red-600":
      "outline-green-600 border-green-600 "} 
       ${disabled?"cursor-not-allowed":"cursor-auto"}
      `}  aria-invalid={errors[id] ? "true" : "false"}/>
      <p className="text-red-500 text-sm m-2">{errors[id]?.message}</p>
    </div>
  )
}

export default InputText