

import {connectDB,disconnectDB} from '@/lib/mongo_db';
import { Application,Review, User } from '@/models/mongoose';
import { writeFile ,existsSync,mkdirSync } from 'fs';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

 export const  POST=async (req: NextRequest, res: any)=> {
   try {
    
      const form=await req.formData()
       console.log(form,"form")
       const full_name=form.get('full_name');
       const surname=form.get('surname') ;
       const profession=form.get('profession')
       const palce_of_birth=form.get('palce_of_birth')
       const gender=form.get('gender') 
       const job_status=form.get('has_job') 
       const job=form.get('job') 
       const status=form.get('status') 
       const mother_date_of_birth=form.get('mother_date_of_birth')

       const mobile_number=form.get('mobile_number');
       const mother_nationality=form.get('mother_nationality');
       const mother_full_name=form.get('mother_full_name') ;
       const job_address=form.get('job_address') ;
       const applicant_address=form.get('address') ;
       const date_of_birth=form.get('date_of_birth') ;
     await connectDB()
     const session=await getServerSession()
     console.log(session,'session')
     const isUserAlreadyApplied=await Application.find({where:
      {
        full_name,
      mother_full_name,
      surname
    }})
    if(isUserAlreadyApplied.length){
     await  disconnectDB()
      return  NextResponse.json({message:"لايمكنك تقديم الطلب لانك قدمت مسبقا او لديك جواز ساري المفعول"},{status:422})
    }



      
       const birth_certificate=await  saveFile(form.get('birth_certificate') as File,form.get("full_name")+"-birth_certificate")
      const mother_file_id=await  saveFile(form.get('mother_file') as File,form.get("full_name")+"-mother_file")
      let school_certificate=null;
       if(form.get("school_certificate")!="undefined" ){
         school_certificate=await  saveFile(form.get('school_certificate') as File,form.get("full_name")+"-school_certificate");
       }
      const first_witness=await  saveFile(form.get('first_witness') as File,form.get("full_name")+"-first_witness");
      const second_witness=await  saveFile(form.get('second_witness') as File,form.get("full_name")+"-second_witness");
      if(!session)return  NextResponse.json({message:"يرجئ التاكد من بياناتك ومعاوده ارسال الطلب مرة اخرئ"},{status:403})
        
      const user_data = await Application.create({
        full_name,
        surname,
        profession,
        palce_of_birth,
        date_of_birth,
        gender,
        status,
        type_of_job:job_status,
        job:job,
        address_of_job:job_address,
        address:applicant_address,
        mobile_number,
        mother_full_name,
        mother_date_of_birth,
        mother_nationality,
        birth_certificate,
        mother_file_id,
        first_witness,
        second_witness,
        school_certificate,
        user_id:session.user.id
      })

      const review=await Review.create({applicationId:user_data._id,userId:user_data.user_id,branch:user_data.state})
   console.log(review,'created')
     await disconnectDB()
      return NextResponse.json({message:"سيتم مراجعه طلبك قريبا يمكنك التحقق من حاله طلبك عن طريق الاستعلام عن جوازي"},{status:201})
   } catch (error) {
    console.log(error)
    await disconnectDB()
   return NextResponse.json({message:"يرجئ التاكد من بياناتك ومعاوده ارسال الطلب مرة اخرئ"},{status:403})
   }
   
}


async  function saveFile(file:File,extension_name:string){

  const dir="uploads/";
  if(!existsSync(dir)){
     mkdirSync(dir,{recursive:true})
  }
const buffer = Buffer.from(await file.arrayBuffer());
const filename = extension_name.replaceAll(" ","_")+"-"+Date.now() + file.name.replaceAll(" ", "_");
console.log(filename,"file name");
try {
   writeFile(path.join(process.cwd(),"uploads/"+ filename), buffer,(err)=>{
    console.log(' inserted successfully')
  });

  return filename
} catch (error) {
  console.log("Error occured ", error);
  return null
}
}






