"use client"
import PrimaryButton from '@/app/components/buttons/Primary-button';
import FileInput from '@/app/components/inputs/file-input';
import React from 'react'
import { FieldValues, Resolver, SubmitHandler, useForm } from 'react-hook-form';

const ExtraDocuments = ({requiredDocs}:{requiredDocs:any}) => {
   if(!requiredDocs.length)return null;
 
    const resolver: Resolver<FieldValues> = (values: FieldValues) => {
        return {
          values: values ? values : {},
          errors: {
          
              ...(values.first_file === "" || !values.first_file
              ? {
                first_file: {
                    type: "required",
                    message: "يجب عليك تحميل الملف المطلوب من المكتب  ",
                  },
                }
              : {}),
              
              
          },
        };
      };
      const {handleSubmit,register,watch,getValues,formState:{errors},setError,clearErrors}=useForm<FieldValues>({resolver,
        defaultValues:{
            first_file:"",
            second_file:"",
            third_file:""
        }
    });
  
  const onSubmit: SubmitHandler<FieldValues> = (data) => {

    }

    const first_file = watch("first_file");
    const second_file = watch("second_file");
    const third_file = watch("third_file");

  return (
    <div >
     {
        requiredDocs.length==1? <FileInput value={first_file} label={"حمل ملف "+requiredDocs[0]} errors={errors} id='first_file'  register={register}/>:requiredDocs.length==2?
         <>
          <FileInput value={first_file} label={"حمل ملف "+requiredDocs[0]} errors={errors} id='first_file'  register={register}/>
          <FileInput value={second_file} label={"حمل ملف "+requiredDocs[1]} errors={errors} id='second_file'  register={register}/>
         </>:
         <>
         <FileInput value={first_file} label={"حمل ملف "+requiredDocs[0]} errors={errors} id='first_file'  register={register}/>
          <FileInput value={second_file}  label={"حمل ملف "+requiredDocs[1]} errors={errors} id='second_file'  register={register}/>
          <FileInput value={third_file} label={"حمل ملف "+requiredDocs[2]} errors={errors} id='third_file'  register={register}/>
          <PrimaryButton   label='ارسال الملفات الاضافية'/>
         </>
     }
    </div>
  )
}

export default ExtraDocuments