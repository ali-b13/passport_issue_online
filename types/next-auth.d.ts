import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id:String,
      isAdmin: Boolean ,
      isOfficer:Boolean,
      email:String,
      email_verified:Boolean
    }
  }
}