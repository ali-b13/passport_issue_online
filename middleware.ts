import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = req.nextUrl.pathname;
 
  // Get session
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
console.log(session)
  if(session){
      if(session.role && (path.startsWith("/dashboard")||path=="/"||path=="/login"||path=="register")){
        return NextResponse.redirect(new URL("/office",req.url))
      }
      if(session.role &&path=="/office"){
        return null
      }
      if(!session.role && (path.startsWith("/office")||path=="/"||path=="/login"||path=="register")){
        return NextResponse.redirect(new URL("/dashboard",req.url))
      }
      if(!session.role &&path=="/dashboard"){
        return null
      }
  }else {
       if(path === "/register" ){
        return null
       }
   else  if (path.startsWith("/office")|| path === "/" || path === "/login" || path.startsWith("/dashboard")) {
  
      if (path !== "/login") {
        return NextResponse.redirect(new URL("/login",req.url))
      } else {
        
          // Handle the case when the current path is already "/login"
          return null; // or return something else, depending on your requirements
      }
  }
     
  }
  return NextResponse.next()
}