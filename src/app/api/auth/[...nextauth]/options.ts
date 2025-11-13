import authServiceRequests from "@/transport/gateway/gRPC/requests/auth/auth-requests";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "john" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await authServiceRequests.login(
            {
              username: credentials?.username || "",
              password: credentials?.password || "",
            },
            3
          );

          const userResp = await authServiceRequests.myInfo({}, 3);
          const user = userResp?.data || null;

          if (res.success && user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Authorize error:", error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Customize session object here
      return session;
    },
    async jwt({ token, user }) {
      // Customize JWT token here
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/auth/welcome", // New users will be directed here on first sign in
  },
};
