"use server"
import { connectDB } from '@/lib/mongo_db';
import { Officer } from '@/models/mongoose';
import bcrypt from 'bcrypt'
import { revalidatePath } from 'next/cache';
export async function createAdmin(admin:any){
 console.log("inside create")
    await connectDB()
    const isExistedAdmin=await Officer.findOne().where({role:"admin"})
    if(!isExistedAdmin){
        const salt =await bcrypt.genSalt(10)
        const hasedPassword=await bcrypt.hash(admin.password,salt)
    const admin_user =await Officer.create({...admin,password:hasedPassword,role:"admin"});
    revalidatePath("/login")
    console.log(admin_user,'created')
    return {success:true,error:null,status:201}
    }else {

        return {success:false,error:"فشل التحقق",status:404}
    }

}
export const adminExisted=async()=>{
    await connectDB()
    const isExistedAdmin=await Officer.findOne().where({role:"admin"})
    console.log(isExistedAdmin,'is')
    if(isExistedAdmin){
        return true
    }else {
        false
    }
   
}