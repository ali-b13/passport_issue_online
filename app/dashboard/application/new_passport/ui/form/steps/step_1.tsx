"use client"
import PrimaryButton from '@/app/components/buttons/Primary-button';
import InputText from '@/app/components/inputs/input-text'
import SelectButton from '@/app/components/inputs/select-input';
import React from 'react'
import { FieldValues, Resolver, SubmitHandler, useForm } from 'react-hook-form'
import PopUp from '../popUp';
const resolver: Resolver<FieldValues> = (values: FieldValues) => {
    return {
      values: values.full_name ? values : {},
      errors: {
        ...(values.full_name === "" || !values.full_name
          ? {
            full_name: {
                type: "required",
                message: "الرجاء ادخال الاسم الثلاثي",
              },
            }
          : {}),
         
        ...(values.surname === "" || !values.surname
          ? {
            surname: {
                type: "required",
                message: " اللقب مطلوب",
              },
            }
          : {}),
          ...(values.profession === "" || !values.profession
          ? {
            profession: {
                type: "required",
                message: " المهنة مطلوبه",
              },
            }
          : {}),
          ...(values.palce_of_birth === "" || !values.palce_of_birth
          ? {
            palce_of_birth: {
                type: "required",
                message: " محل الميلاد مطلوب",
              },
            }
          : {}),
          ...(values.gender === "" || !values.gender
          ? {
            gender: {
                type: "required",
                message: " النوع مطلوب",
              },
            }
          : {}),
          ...(values.date_of_birth === "" || !values.date_of_birth
          ? {
            date_of_birth: {
                type: "required",
                message: "  تاريخ الميلاد مطلوب",
              },
            }
          : {}),
      },
    };
  };
  


const Step_1 = ({step,setStep,setProgressLevel,setData,formData}:any) => {
    const {handleSubmit,register,formState:{errors},setError,clearErrors}=useForm<FieldValues>({resolver,defaultValues:{
        full_name:"",
        surname:"",
        profession:"",
        palce_of_birth:"",
        gender:"",
        date_of_birth:"",


    }});
  
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
      setData((prev:any)=>({...prev,...data}))
     setStep((prev:number)=>prev+1)
     setProgressLevel((prev:number)=>prev+1)
    }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col  items-start gap-5 p-3 m-3'>
        <section  className='w-full flex flex-col items-start md:flex-row gap-5'>
        <div className='w-full md:w-1/4'>
        <InputText label='الاسم الثلاثي' errors={errors} id='full_name' type='text' register={register} />
        <InputText label=' اللقب' errors={errors} id='surname' type='text' register={register} />
        <InputText label=' المهنة' errors={errors} id='profession' type='text' register={register} />
        </div>
        <div className='w-full md:w-1/4'>
        <InputText label=' مكان الميلاد' errors={errors} id='palce_of_birth' type='text' register={register} />
        <InputText classname='w-[15rem]' label=' تاريخ الميلاد' errors={errors} id='date_of_birth' type='date' register={register} />
        <div className='w-full  my-6'>
        <SelectButton  register={register} errors={errors} id='gender' label='اختر جنسك' options={[{label:"ذكر"},{label:"انثئ"}]}/>
        </div>
        </div>
        </section>
       <div className='w-full md:w-1/4  '>
        <PrimaryButton disable type='submit'  label='استمرار'/>
        </div>
        <PopUp warning title={"تنويه"} content={" للتقديم طلب جواز يجب عليك املاء الاستماره بدون معلومات خاطئه او اخطاء املائيه لتجنب التاخير في الرد والالتزام بالتعليمات المتبعه."}/>
    </form>
  )
}

export default Step_1