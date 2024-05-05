"use client"
import PrimaryButton from '@/app/components/buttons/Primary-button';
import InputText from '@/app/components/inputs/input-text'
import { FieldValues, Resolver, SubmitHandler, useForm } from 'react-hook-form'

import Title from '@/app/components/title';
import FileInput from '@/app/components/inputs/file-input';
import RadioInput from '@/app/components/inputs/radio-input';
import SubTitle from '@/app/components/SubTitle';

const resolver: Resolver<FieldValues> = (values: FieldValues) => {
    return {
      values: values.birth_certificate ? values : {},
      errors: {
        ...(values.birth_certificate === "" || !values.birth_certificate
          ? {
            birth_certificate: {
                type: "required",
                message: " شهادة الميلاد مطلوبة",
              },
            }
          : {}),
         
          ...(values.has_school_certificate == "نعم"?
          values.school_certificate==""
          ? {
            school_certificate: {
                type: "required",
                message: " حمل الشهاده الدراسية ",
              },
              
            }
          : {}:{}),
         
          ...(values.first_witness === "" || !values.first_witness
          ? {
            first_witness: {
                type: "required",
                message: " بطاقه او جواز الشاهد الاول مطلوبه",
              },
            }
          : {}),
          ...(values.second_witness === "" || !values.second_witness
          ? {
            second_witness: {
                type: "required",
                message: " بطاقه او جواز الشاهد الثاني مطلوبه",
              },
            }
          : {}),
          
      },
    };
  };
  


const Step_4 = ({step,setStep,setProgressLevel,setData,formData,submitForm}:any) => {

    const {handleSubmit,register,watch,getValues,formState:{errors},setError,clearErrors}=useForm<FieldValues>({resolver,defaultValues:{
        birth_certificate:"",
        has_school_certificate:"",
        school_certificate:"",
        first_witness:"",
        second_witness:""


    }});
  
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
     const submittedData={...formData,...data}
     submitForm(submittedData)
      setStep((prev:number)=>prev+1)
     setProgressLevel((prev:number)=>prev+1)
    }
    const birth_certificate = watch("birth_certificate");
    const has_school_certificate = watch("has_school_certificate");
    const school_certificate = watch("school_certificate");
    const first_witness = watch("first_witness");
    const second_witness = watch("second_witness");
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-start gap-5 p-3 m-3'>
         <Title title={" بيانات المقدم"}/>
        <section  className='w-full flex flex-col items-start  md:flex-row gap-5'>
        <div className='w-full md:w-1/4'>
        <FileInput value={birth_certificate} label=' حمل صوره شهادة الميلاد' errors={errors} id='birth_certificate'  register={register}/>
        <RadioInput label='هل لديك شهادة دراسيه ' errors={errors} val1='نعم' val2='لايوجد'  id='has_school_certificate' register={register} />
        <FileInput disabled={has_school_certificate=="لايوجد"} value={school_certificate} label=' حمل صوره الشهادة الدراسية' errors={errors} id='school_certificate'  register={register}/>
        </div>
        <div className='w-full md:w-1/4'>
        <FileInput value={first_witness} label=' حمل صوره جواز او بطاقه الشاهد الاول' errors={errors} id='first_witness'  register={register}/>
        <FileInput value={second_witness} label=' حمل صوره جواز او بطاقه الشاهد الثاني' errors={errors} id='second_witness'  register={register}/>
        </div>
        </section>
        <SubTitle title={"*رسوم الطلب 1000 ريال يمني تدفع عند الموافقه علئ الطلب "}/>
       <div className='w-full md:w-1/4  '>
        <PrimaryButton disable type='submit'  label='تقديم'/>
        </div>
    </form>
  )
}

export default Step_4