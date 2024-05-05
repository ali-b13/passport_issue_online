"use client"
import OutlineButton from "../buttons/outlineButton"
import PlatForm from "../goverment-copyright/agdam"
import { FaBars,FaXmark } from "react-icons/fa6";
import { Transition,Dialog, } from "@headlessui/react";
import { useState,Fragment, useEffect } from "react";
import { navLinks } from "@/utils/placeholder-data";
import Link from "next/link";
import PrimaryButton from "../buttons/Primary-button";
import { signOut } from "next-auth/react";
const Mobile_NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth > 768) {
            setIsOpen(false);
          }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, [isOpen]);
  return (
  <div className="flex md:hidden justify-between items-center ">


    <div>
        {
            <button className={`flex h-11 
            ${isOpen?"hidden":"flex"} w-11 items-center justify-center rounded-md border
            text-white transition-colors  md:hidden`}
            onClick={()=>setIsOpen(prev=>!prev)}>
               <FaBars className='h-6 w-6'  />
           </button>
        }
    <Transition show={isOpen}>
        <Dialog onClose={()=>setIsOpen(false)} className="relative z-50 ">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in duration-100"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in duration-100"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-grey-500/20" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-100"
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-50"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <Dialog.Panel className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col bg-neutral-700 pb-6  ">
              <div className="p-4 ">
               <div className='flex items-center w-[100%] justify-between mb-4'>
                 <button
                  className=" flex h-11 w-11 items-center mt-4 justify-center rounded-md border text-white transition-colors "
                  onClick={()=>setIsOpen(false)}
                  aria-label="Close mobile menu"
                >
                  <FaXmark color='white' className="h-6" />
                </button>
               </div>
                <div className='flex md:hidden  flex-col justify-center items-center gap-6 mb-6' >
                   {
                    navLinks.map((link)=>{
                        return <Link key={link.href} href={link.href} onClick={()=>setIsOpen(prev=>!prev)} className='text-lg w-full p-2  text-center border-b-2 text-white font-semibold '>{link.name}</Link>
                    })
                   }
                </div>
                 <PrimaryButton onClick={()=>signOut()} label="تسجيل الخروج"/>
                
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
    <PlatForm/>
  </div>
  )
}

export default Mobile_NavBar