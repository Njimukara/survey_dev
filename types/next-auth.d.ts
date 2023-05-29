import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface user {
    name: string;
    email: string;
    date_joined: string;
    user_profile: any;
  }

  interface Session {
    user: {
      /** The user's postal address. */
      data: any;
      auth_token: string;
    } & DefaultSession["user"];
  }
}
