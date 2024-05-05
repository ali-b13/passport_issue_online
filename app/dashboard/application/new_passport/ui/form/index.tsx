"use client"
import React, { useState } from 'react'
import Step_1 from './steps/step_1'
import ProgressBar from '@/app/components/ProgressBar'
import STEP_2 from './steps/step_2'
import Step_3 from './steps/step_3'
import Step_4 from './steps/step_4'
import PopUp from './popUp'
import { useRouter } from 'next/navigation'
import Loading from '@/app/components/Loading'
enum STEPS{
 STEP_1=1,
 STEP_2=2,
 STEP_3=3,
 STEP_4=4,
}
const FormIssuePassport = () => {
  const [data,setData]=useState({})
  const [isLoading ,setIsLoading]=useState(false)
  const [statusMessage,setStatusMessage]=useState("")
    const [progressLevel,setProgressLevel]=useState(1);
    const [statusReceived,setStatusReceived]=useState(false)
    const [showSuccessPopUp,setShowSuccessPopUp]=useState(false)
  const [step,setStep]=useState(STEPS.STEP_1)
  const submitForm=async(data:any)=>{
    setIsLoading(true)
  const formData=new FormData();
  formData.append("full_name",data.full_name)
  formData.append("surname",data.surname)
  formData.append("profession",data.profession)
  formData.append("palce_of_birth",data.palce_of_birth)
  formData.append("gender",data.gender)
  formData.append("job",data.job)
  formData.append("has_job",data.has_job)
  formData.append("status",data.status)
  formData.append("mother_date_of_birth",data.mother_date_of_birth)
  formData.append("mobile_number",data.mobile_number)
  formData.append("mother_nationality",data.mother_nationality)
  formData.append("mother_full_name",data.mother_full_name)
  formData.append("job_address",data.job_address)
  formData.append("address",data.address)
  formData.append("date_of_birth",data.date_of_birth)
  formData.append("mother_file",data.mother_file[0])
  formData.append("birth_certificate",data.birth_certificate[0])
  console.log(data.birth_certificate[0],'here the data to upload')
  formData.append("first_witness",data.first_witness[0])
  formData.append("school_certificate",data.school_certificate[0])
  formData.append("second_witness",data.second_witness[0])

   const response =await  fetch("/api/application/new_passport",{body:formData,method:"POST"})
   const responseData =await response.json();
     setStatusMessage(responseData.message)
   if(response.ok && response.status==200||response.status==201){
    setShowSuccessPopUp(true)
   }
   setIsLoading(false)
   setStatusReceived(true)
  }
  
  const ShowMessagePopUp=()=>{
    return (
        showSuccessPopUp?<PopUp redirectedPath={"/dashboard"} title={"تم ارسال الطلب بنجاح"} content={statusMessage}/>
        :
        <PopUp redirectedPath={"/dashboard"} title={"فشل في تقديم الطلب"} warning content={statusMessage}/>
      
    )
  }

  return (
    <div className=' flex flex-col p-6 w-full border-2 min-h-[50vh]' dir='rtl'>
        <div className='flex justify-between items-center'>
        <h2 className=' text-neutral-500'>الرجاء ادخال البيانات  </h2>
        <ProgressBar progressLevel={progressLevel} />
        </div>
        {
            step===STEPS.STEP_1&& <Step_1 setData={setData} formData={data}  step={step} setStep={setStep} setProgressLevel={setProgressLevel}/> ||
            step===STEPS.STEP_2&&<STEP_2 setData={setData} formData={data} step={step} setStep={setStep} setProgressLevel={setProgressLevel}/>||
            step===STEPS.STEP_3&& <Step_3 setData={setData} formData={data}  step={step} setStep={setStep} setProgressLevel={setProgressLevel} />||
            step===STEPS.STEP_4&& <Step_4 setData={setData} submitForm={submitForm} formData={data}  step={step} setStep={setStep} setProgressLevel={setProgressLevel} />
           
        }
        {isLoading&&
        <div className='self-center '>
          <Loading/>
        </div>}
         {statusReceived&&<ShowMessagePopUp/>}
    </div>
  )
}

export default FormIssuePassport
