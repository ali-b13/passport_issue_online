"use client";
import Header from '@/app/components/Header'
import PrimaryButton from '@/app/components/buttons/Primary-button'
import NotRegisteredButton from '@/app/components/buttons/not-registered-button'
import PlatformLogo from '@/app/components/goverment-copyright/platformLogo'
import InputText from '@/app/components/inputs/input-text'
import { useForm, SubmitHandler, FieldValues, Resolver } from "react-hook-form"
import { toast } from 'react-toastify';
import {validateEmail} from "@/utils/validateEmail"
import {states}from '@/utils/placeholder-data'
import SelectButton from '@/app/components/inputs/select-input';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
const resolver: Resolver<FieldValues> = (values: FieldValues) => {
  return {
    values: values.email ? values : {},
    errors: {
      ...(values.email === "" || !values.email
        ? {
            email: {
              type: "required",
              message: "الرجاء ادخال الايميل",
            },
          }
        : {}),
        ...(values.password === "" || !values.password
        ? {
            password: {
              type: "required",
              message: "الرجاء ادخال كلمه مرور",
            },
          }
        : {}),
        ...(values.re_password === "" || !values.re_password
        ? {
            re_password: {
              type: "required",
              message: "الرجاء  تاكيد كلمه المرور",
            },
          }
        : {}),
        ...(values.re_password !==  values.password
        ? {
            re_password: {
              type: "required",
              message: "   كلمه المرور غير متطابقه",
            },
          }
        : {}),
        
      ...(values.state === "novalue" || !values.state
        ? {
            state: {
              type: "required",
              message: "  المحافظة  مطلوبه",
            },
          }
        : {}),
    },
  };
};

const RegisterForm = () => {
  const [pending ,setPending]=useState(false)
  const [error ,setError]=useState(null)
  const router=useRouter()
  const {handleSubmit,register,formState:{errors}}=useForm<FieldValues>({resolver,defaultValues:{email:"",password:"",state:""}});

  const onSubmit: SubmitHandler<FieldValues> =async (data) => {
    setPending(true)
    const id = toast.loading( "جاري إنشاء حسابك")
    const res= await fetch("/api/signup",{body:JSON.stringify(data),method:"POST"})
    const res_data=await res.json()
    setPending(false)
     if(res_data.status==422 || res_data.error){
      toast.update(id, { render: "  تعذر إنشاء حسابك", type: "error", isLoading: false ,autoClose:1000});
      setError(res_data.message)
     }else {
      toast.update(id, { render:"تم إنشاء الحساب بنجاح", type: "success", isLoading: false,autoClose:2000 });
      router.push("/login")
     }
  
     
   
  }

  return (
    <section className=' w-full flex flex-col gap-6'>
        <PlatformLogo/>
   
    <div className=' w-full h-[70vh]  p-2 flex mt-8  gap-6 align-center justify-center  rounded-xl'>
       <form onSubmit={handleSubmit(onSubmit)} className='w-full md:w-4/5 lg:w-3/6 self-center flex flex-col gap-3 text-center '>
       <Header value='انشاء حساب  اقدام '/>
        <InputText errors={errors} id={"email"} register={register} type={"email"} label='ادخل الايميل'/>
        <InputText errors={errors} id={"password"} register={register} type={"password"} label='ادخل كلمه مرور جديده'/>
        <InputText errors={errors} id={"re_password"} register={register} type={"password"} label='ادخل كلمه المرور للتاكيد'/>
        <SelectButton options={states} label='اختر محافظتك' errors={errors} id={"state"} register={register}/>
        <PrimaryButton disable type="submit" label={`${pending ?"جاري انشاء الحساب":"انشاء"}`}/>
        {error&&<span className='text-red-400 text-sm'>{error}</span>}
        <NotRegisteredButton label='لديك حساب بالفعل؟ ادخل من هنا' path='/login'/>
       </form>
       
    </div>
    </section>
  )
}

export default RegisterForm