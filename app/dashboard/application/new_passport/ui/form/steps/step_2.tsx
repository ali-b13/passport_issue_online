"use client"
import PrimaryButton from '@/app/components/buttons/Primary-button';
import InputText from '@/app/components/inputs/input-text'
import RadioInput from '@/app/components/inputs/radio-input';
import React from 'react'
import { FieldValues, Resolver, SubmitHandler, useForm } from 'react-hook-form'
const resolver: Resolver<FieldValues> = (values: FieldValues) => {
    return {
      values: values.address ? values : {},
      errors: {
        ...(values.address === "" || !values.address
          ? {
            address: {
                type: "required",
                message: "الرجاء ادخال  العنوان",
              },
            }
          : {}),
         
        ...(values.status === "" || !values.status
          ? {
            status: {
                type: "required",
                message: " الحاله الاجتماعيه مطلوبه",
              },
            }
          : {}),
          ...(values.has_job === "" || !values.has_job
          ? {
            has_job: {
                type: "required",
                message: "  حدد اذا انت عامل ام عاطل",
              },
            }
          : {}),
          ...(values.mobile_number === "" || !values.mobile_number
          ? {
            mobile_number: {
                type: "required",
                message: " رقم الهاتف مطلوب",
              },
            }
          : {}),
        
          ...(values.has_job === "عامل"
          ? values.job===""?{
            job: {
                type: "required",
                message: "حدد نوع العمل ",
              },
              job_address: {
                type: "required",
                message: "  عنوان العمل مطلوب",
              },
            }
          : {}:{}),
        
         
      },
    };
  };
  


const Step_2 = ({step,setStep,setProgressLevel,setData,formData}:any) => {
    const {handleSubmit,register,watch,formState:{errors},setError,clearErrors}=useForm<FieldValues>({resolver,defaultValues:{
        address:"",
        status:"",
        has_job:"عامل",
        job:"",
        job_address:"",
        mobile_number:"",


    }});
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
      setData((prev:any)=>({...prev,...data}))
      setStep((prev:number)=>prev+1)
      setProgressLevel((prev:number)=>prev+1)
    }

    const job_attribute = watch('has_job');
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col  items-start gap-5 p-3 m-3'>
        <section  className='w-full flex flex-col items-start md:flex-row gap-5'>
        <div className='w-full md:w-1/4'>
        <InputText label=' عنوان السكن' errors={errors} id='address' type='text' register={register} />
        <RadioInput label=' الحاله الاجتماعيه' errors={errors} val1='اعزب' val2='متزوج'  id='status' register={register} />
        <InputText label=' رقم الهاتف' errors={errors} id='mobile_number' type='text' register={register} />
        </div>
        <div className='w-full md:w-1/4'>
        
        <RadioInput label='هل لديك عمل ' errors={errors} val1='عامل' val2='عاطل'  id='has_job' register={register} />
        <InputText disabled={job_attribute=="عاطل"} classname='w-[15rem]' label=' المسمئ الوظيفي' errors={errors} id='job' type='text' register={register} />
        <InputText disabled={job_attribute=="عاطل"} label=' عنوان العمل ' errors={errors} id='job_address' type='text' register={register} />
        </div>
        </section>
       <div className='w-full md:w-1/4  '>
        <PrimaryButton disable type='submit'  label='استمرار'/>
        </div>
    </form>
  )
}

export default Step_2