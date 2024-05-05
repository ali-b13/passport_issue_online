"use client"
import PrimaryButton from '@/app/components/buttons/Primary-button'
import { signOut } from 'next-auth/react'
import React from 'react'

const Dashboard = () => {
  return (
    <div> 
         {/* <PrimaryButton onClick={()=>signOut()} label="تسجيل الخروج"/> */}
         </div>
  )
}

export default Dashboard