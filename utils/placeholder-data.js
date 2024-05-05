
export const states=[
    {
        label:"شبوة"
    },
    {
     
        label:"حضرموت"
    },
    {
   
        label:"عدن"
    },
    {
   
        label:"المهرة"
    },
    {
  
        label:"ابين"
    },
]


export const navLinks=[
 {
    id:1,
    name:"كيف اقدم طلب جواز",
    href:"/services/requirement-for-passport"
 }, {
    id:2,
    name:"كيف ادفع الرسوم",
    href:"/services/how-to-pay-the-fees"
 }
]

import passportSrc from '@/public/assets/passport-svg.svg'
import passportRenewlSrc from '@/public/assets/passport-renew.svg'
import passportModifylSrc from '@/public/assets/passport-modify.svg'
import myPassport from '@/public/assets/mypassport.svg'
import report from '@/public/assets/report-passport.svg'
import connectDB from '@/lib/mongo_db'
export const cardsData=[
    {
        id:1,
        name:"طلب جواز جديد",
        icon:passportSrc,
        href:"/dashboard/application/new_passport"
    },
    {
        id:2,
        name:"طلب تجديد جواز",
        icon:passportRenewlSrc,
        href:"/dashboard/application/passport_renewal"
    },
    {
        id:3,
        name:"طلب تعديل جواز",
        icon:passportModifylSrc,
        href:"/dashboard/application/passport_modify_form"
    },
    {
        id:4,
        name:"الاستعلام عن جوازي",
        icon:myPassport,
        href:"/dashboard/application/my_query"
    },
    {
        id:5,
        name:"  الابلاغ عن جواز",
        icon:report,
        href:"/dashboard/application/report"
    }
]



