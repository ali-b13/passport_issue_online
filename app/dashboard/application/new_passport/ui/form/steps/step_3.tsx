"use client"
import PrimaryButton from '@/app/components/buttons/Primary-button';
import InputText from '@/app/components/inputs/input-text'
import SelectButton from '@/app/components/inputs/select-input';
import React, { useMemo } from 'react'
import { FieldValues, Resolver, SubmitHandler, useForm } from 'react-hook-form'
import PopUp from '../popUp';
import countryList from 'react-select-country-list'
import Title from '@/app/components/title';
import FileInput from '@/app/components/inputs/file-input';

const resolver: Resolver<FieldValues> = (values: FieldValues) => {
    return {
      values: values.mother_nationality ? values : {},
      errors: {
        ...(values.mother_nationality === "" || !values.mother_nationality
          ? {
            mother_nationality: {
                type: "required",
                message: " الجنسية مطلوبة",
              },
            }
          : {}),
         
        ...(values.mother_full_name === "" || !values.mother_full_name
          ? {
            mother_full_name: {
                type: "required",
                message: " اسم الام مطلوب كاملا",
              },
            }
          : {}),
          ...(values.mother_date_of_birth === "" || !values.mother_date_of_birth
          ? {
            mother_date_of_birth: {
                type: "required",
                message: "  تاريخ ميلاد الام مطلوب",
              },
            }
          : {}),
          ...(values.mother_file === "" || !values.mother_file
          ? {
            mother_file: {
                type: "required",
                message: "   ملف جواز الام مطلوب",
              },
            }
          : {}),
          
      },
    };
  };
  


const Step_3 = ({step,setStep,setProgressLevel,setData,formData}:any) => {
    const options = useMemo(() => countryList().getData(), [])

    const {handleSubmit,register,watch,getValues,formState:{errors},setError,clearErrors}=useForm<FieldValues>({resolver,defaultValues:{
        mother_full_name:"",
        mother_nationality:"",
        mother_date_of_birth:"",
        mother_file:"",


    }});
  
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
      setData((prev:any)=>({...prev,...data}))
      setStep((prev:number)=>prev+1)
     setProgressLevel((prev:number)=>prev+1)
    }
    const mother_file = watch("mother_file");
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-start gap-5 p-3 m-3'>
         <Title title={" بيانات الام"}/>
        <section  className='w-full flex flex-col items-start  md:flex-row gap-5'>
        <div className='w-full md:w-1/4'>
        <InputText label='  اسم الام كاملا' errors={errors} id='mother_full_name' type='text' register={register} />
           <div className='w-full  my-8'>
            <SelectButton options={options} errors={errors} id='mother_nationality' label=' اختر الجنسيه الام' register={register} />

          </div>
        </div>
        <div className='w-full md:w-1/4'>
        <InputText classname='w-[15rem]' label=' تاريخ الميلاد' errors={errors} id='mother_date_of_birth' type='date' register={register} />
        <FileInput value={mother_file} label=' حمل صوره جواز او بطاقه الام' errors={errors} id='mother_file'  register={register}/>
        </div>
        </section>
       <div className='w-full md:w-1/4  '>
        <PrimaryButton disable type='submit'  label='استمرار'/>
        </div>
    </form>
  )
}

export default Step_3