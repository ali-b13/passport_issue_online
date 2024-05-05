"use server";

import { connectDB, disconnectDB } from "@/lib/mongo_db";
import { Application, Review } from "@/models/mongoose";

export const getReviewApplication=async(userId:string)=>{
  try {
    await connectDB()
    console.log(userId,"userId")
    const applicationReview=await Review.find().where({userId:userId}).populate('applicationId')
    console.log(applicationReview,"reviews in server now")
    await disconnectDB()
    return applicationReview
  } catch (error) {
    console.log(error)
    await disconnectDB()
    return []
  }
}

export const getReviewById=async(userId:string,reviewId:string)=>{
    try {
        await connectDB()
        
        const applicationReview=await Review.findOne().where({_id:reviewId,userId:userId}).populate('applicationId').populate({path:"userId",select:"stateId"})
        console.log(applicationReview,"reviews in server now")
        await disconnectDB()
        return applicationReview
      } catch (error) {
        console.log(error)
        await disconnectDB()
        return []
      }
}