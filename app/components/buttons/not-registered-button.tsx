import Link from 'next/link'
import React from 'react'
 type ButtonProps={
    label :string,
    path:string,
 }
const NotRegisteredButton:React.FC<ButtonProps> = ({label,path}) => {
  return (
    <Link className='text-blue-500' href={path}>{label}</Link>
  )
}

export default NotRegisteredButton