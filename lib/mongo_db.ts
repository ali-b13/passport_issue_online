import mongoose from "mongoose";
export async function  connectDB(){
  
    try {
       await  mongoose.connect(process.env.MONGODB_URI as string,{autoCreate:false})
        console.log("connected to mongoDB successfully")
    } catch (error) {
        console.log(error)
       
    }
}

export async function disconnectDB(){
    try {
        await  mongoose.disconnect()
         console.log("disconnect to mongoDB ")
     } catch (error) {
         console.log(error)
        
     }
}

