import {getServerSession, type NextAuthOptions}  from 'next-auth';

import bcrypt from 'bcrypt'
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { Officer, User } from './models/mongoose';
import { connectDB, disconnectDB } from './lib/mongo_db';
import { revalidatePath } from 'next/cache';

export const authConfig  = {
    pages:{
        signIn:"/login",

       
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),

        CredentialsProvider({
            // Configuration options for the credentials provider
            name:"credentials",
            credentials: {},
            authorize: async (credentials: any) => {
               try {
                console.log(credentials,"crednetails")
               await  connectDB()
                const user=await User.findOne().where({email:credentials.email})
                if(user){
               const matchPassword =await bcrypt.compare(credentials.password,user.password)
                  if(matchPassword){
                    revalidatePath("/login")
                    return user
                  }
                }else {
                    const officer=await Officer.findOne().where({email:credentials.email})
                    if(officer){

                    
                    const matchPassword =await bcrypt.compare(credentials.password,officer.password)
                    if(matchPassword){
                        revalidatePath("/login")
                      return officer
                    }
                }

                }
                console.log("null no match")
                await disconnectDB()
               return null
               } catch (error) {
                console.log(error)
                return null
                // return Promise.reject("الايميل او كلمة المرور غير صحيحة")
               }
                
            },
           
        }),
    ],

    callbacks: {
     
        async signIn({ account, profile, user }: any) {

            return true
        },
        async session({ session, token, user }: any) {
            try {
                console.log(session)
                session.user.role=token.role
                return session
            } catch (error) {
                return session
            }

        },
        async jwt({ token, account ,user}: any) {
            // Persist the OAuth access_token to the token right after signin
          console.log(user,'user in jwt')
          console.log(token,'token')

            return {
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        },
        async redirect({url,baseUrl}){
       
         return url.startsWith(baseUrl)?url:baseUrl
        }

    },

    debug: process.env.NODE_ENV == "development",
    session: {
        strategy: "jwt",

    },
    secret: process.env.NEXTAUTH_SECRET,
   
   
} satisfies NextAuthOptions;