"use client";
import Header from '@/app/components/Header'
import PrimaryButton from '@/app/components/buttons/Primary-button'
import NotRegisteredButton from '@/app/components/buttons/not-registered-button'
import PlatformLogo from '@/app/components/goverment-copyright/platformLogo'
import InputText from '@/app/components/inputs/input-text'
import { useForm, SubmitHandler, FieldValues, Resolver } from "react-hook-form"

import {validateEmail} from "@/utils/validateEmail"
import { signIn } from "next-auth/react"
import { useState } from 'react';
import { toast } from 'react-toastify';
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
        ...(validateEmail(values.email)==false 
        ? {
            email: {
              type: "required",
              message: " الرجاء ادخال ايميل صحيح",
            },
          }
        : {}),
      ...(values.password === "" || !values.password
        ? {
            password: {
              type: "required",
              message: " كلمه المرور مطلوبه",
            },
          }
        : {}),
    },
  };
};

const FormLogin = () => {
  const [pending ,setPending]=useState(false)
  const [error ,setError]=useState<null|string>(null)
  const router=useRouter()
  const {
    handleSubmit
    ,register,
    formState:{errors}
  }=useForm<FieldValues>({resolver,defaultValues:{email:"",password:""}});

  const onSubmit: SubmitHandler<FieldValues> = async(data) => {
    setError(null)
    setPending(true)
    const id = toast.loading( "جاري الدخول الئ حسابك")
     const res= await signIn("credentials",{email:data.email,password:data.password,redirect:false});
     console.log(res)
     if(!res?.ok &&res?.error ||res?.status==401){
      toast.update(id, { render: "  تعذر تسجيل الدخول", type: "error", isLoading: false ,autoClose:1000});
      setError("الايميل او كلمة المرور غير صحيحة")
     }else {
      toast.update(id, { render:"تم تسجيل الدخول  بنجاح", type: "success", isLoading: false,autoClose:2000 });
      router.push("/")
     }
    setPending(false)
   
  }

  return (
    <section className='w-full flex flex-col gap-6'>
        <PlatformLogo/>
   
    <div className='w-full h-[70vh]  p-2 mt-8 flex   gap-6 align-center justify-center  rounded-xl'>
       <form onSubmit={handleSubmit(onSubmit)} className='w-full md:w-4/5 lg:w-3/6 self-center flex flex-col gap-4 text-center '>
       <Header value='سجل الدخول الئ المنصه'/>
        <InputText errors={errors} id={"email"} register={register} type={"email"} label='ادخل الايميل'/>

        <InputText errors={errors} id={"password"} register={register} type={"password"} label=' كلمه المرور'/>
        <PrimaryButton disable type="submit" label={`${pending ?"جاري الدخول":"تسجيل"}`}/>
        {error&&<span className='text-red-400 text-sm'>{error}</span>}
        <NotRegisteredButton label='جديد؟ سجل من هنا' path='/register'/>
       </form>
    </div>
    </section>
  )
}

export default FormLogin