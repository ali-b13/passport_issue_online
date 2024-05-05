import {connectDB} from "@/lib/mongo_db"
import { verify_email } from "@/lib/verify_email";
import { User } from "@/models/mongoose";
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt"
export const POST=async(req:NextRequest)=>{
    const body =await req.json()
    const {email,state,password}=body;
    await connectDB()
 
    const emailIsExisted=await User.findOne({email:email})
  
    if(emailIsExisted){
        return NextResponse.json({message:"هاذا الايميل مستخدم مسبقا",status:422,error:true},{status:400})
    }
    //hash password
    const saltRounds = 12;
    const hashedPassword=await bcrypt.hash(password,saltRounds)
    const new_user =await User.create({email:email,password:hashedPassword,state:state})
    const token="fddddddddddbvr";
    
    return NextResponse.json({message:"تم التسجل بنجاح",status:201,error:false})
  
}