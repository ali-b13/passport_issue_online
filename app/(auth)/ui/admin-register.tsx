"use client";
import Header from '@/app/components/Header'
import PrimaryButton from '@/app/components/buttons/Primary-button'
import NotRegisteredButton from '@/app/components/buttons/not-registered-button'
import PlatformLogo from '@/app/components/goverment-copyright/platformLogo'
import InputText from '@/app/components/inputs/input-text'
import { useForm, SubmitHandler, FieldValues, Resolver } from "react-hook-form"
import {createAdmin} from "@/app/actions/admin/queries"
import {validateEmail} from "@/utils/validateEmail"
import { signIn } from "next-auth/react"
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import RadioInput from '@/app/components/inputs/radio-input';
import { states } from '@/utils/placeholder-data';
import SelectButton from '@/app/components/inputs/select-input';
const resolver: Resolver<FieldValues> = (values: FieldValues) => {
  return {
    values: values.email ? values : {},
    errors: {
        ...(values.name === "" || !values.name
        ? {
            name: {
              type: "required",
              message: "الرجاء ادخال الاسم",
            },
          }
        : {}),
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
        ...(values.re_password === "" || !values.re_password
        ? {
          re_password: {
              type: "required",
              message: " كلمه المرور مطلوبه",
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
      
      ...(values.gender === "" || !values.gender
        ? {
            gender: {
              type: "required",
              message: "الرجاء اختيار الجنس",
            },
          }
        : {}),
        ...(values.branch === "" || !values.branch
        ? {
            branch: {
              type: "required",
              message: "الرجاء اختيار الفرع",
            },
          }
        : {}),
        ...(values.contact_number === "" || !values.contact_number
        ? {
            contact_number: {
              type: "required",
              message: "الرجاء  ادخال رقم الهاتف",
            },
          }
        : {}),
     
    },
  };
};

const FormAdmin = () => {
  
  const [pending ,setPending]=useState(false)
  const [error ,setError]=useState<null|string>(null)
  const router=useRouter()
  const {
    handleSubmit
    ,register,
    formState:{errors}
  }=useForm<FieldValues>({resolver,defaultValues:{name:"",email:"",password:"",gender:"",branch:"", contact_number:""}});

  const onSubmit: SubmitHandler<FieldValues> = async(data) => {
    setError(null)
    setPending(true)
    const id = toast.loading( "جاري انشاءحساب الادمن")
     const res= await createAdmin(data)
     console.log(res)
     if(res?.error ||res?.status==404){
      toast.update(id, { render: "  تعذر انشاء حساب الادمن", type: "error", isLoading: false ,autoClose:1000});
      setError("خطاء غير متوقع")
     }else {
      toast.update(id, { render:"تم انشاءحساب الادمن", type: "success", isLoading: false,autoClose:2000 });
      router.push("/")
     }
    setPending(false)
   
  }
console.log(errors)
  return (
    <section className='w-full flex flex-col '>
     <PlatformLogo/>
   
    <div className='w-full   p-2  flex   gap-6 align-center justify-center  rounded-xl'>
       <form onSubmit={handleSubmit(onSubmit)} className='w-full md:w-4/5 lg:w-3/6 self-center flex flex-col gap-4 text-center mb-2'>
       <Header value=' انشاء الادمن'/>
       <InputText errors={errors} id={"name"} register={register} type={"text"} label='ادخل الاسم'/>
        <InputText errors={errors} id={"email"} register={register} type={"email"} label='ادخل الايميل'/>

        <InputText errors={errors} id={"password"} register={register} type={"password"} label=' كلمه المرور'/>
        <InputText errors={errors} id={"re_password"} register={register} type={"password"} label=' تاكيد كلمه المرور '/>
        <SelectButton options={[{label:"ذكر"},{label:"انثئ"}]} label='اختر النوع' errors={errors} id={"gender"} register={register}/>

        <SelectButton options={states} label='اختر الفرع' errors={errors} id={"branch"} register={register}/>
        <InputText errors={errors} id={"contact_number"} register={register} type={"number"} label='ادخل رقم الهاتف'/>
        <PrimaryButton disable type="submit" label={`${pending ?"جاري الدخول":"تسجيل"}`}/>
        {error&&<span className='text-red-400 text-sm'>{error}</span>}
        <NotRegisteredButton label='جديد؟ سجل من هنا' path='/register'/>
       </form>
    </div>
    </section>
  )
}

export default FormAdmin