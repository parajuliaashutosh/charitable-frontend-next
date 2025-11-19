import { RoleMapper } from "@/constants/role.enum";
import { logger } from "@/lib/logger";
import rawAuthServiceRequests from "@/transport/gateway/gRPC/requests/auth/raw-auth-requests";
import { NextAuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const getRefreshTokenAfter = (minutes: number = 14) => {
  return Date.now() + minutes * 60 * 1000;
}
export const options: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "john" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<"username" | "password", string>) {
        try {
          const res = await rawAuthServiceRequests.login(
            {
              username: credentials?.username || "",
              password: credentials?.password || "",
            },
            3
          );
          logger.log("Authorize response:", res);

          const resp = await rawAuthServiceRequests.myInfo({}, 3, {
            meta: {
              Authorization: `Bearer ${res?.data?.accessToken}`,
            },
          });
          const userData = resp?.data;
          if (res.success) {
            return {
              id: userData?.id,
              email: userData?.email,
              role: RoleMapper.toAuthRole(userData?.role),
              phoneNumber: userData?.phone || "",
              accessToken: res.data?.accessToken || "",
              refreshToken: res.data?.refreshToken || "",
            } as User;
          } else {
            throw new Error(res.message || "Login failed");
          }
        } catch (error) {
          logger.error("Authorize error:", error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expiresAt = getRefreshTokenAfter();
      }

      if (Date.now() < token.expiresAt) {
        return token;
      }

      // Token expired → refresh
      try {
        const refreshed = await rawAuthServiceRequests.refreshToken({
          refreshToken: token.refreshToken,
        });

        token.accessToken = refreshed.data.accessToken;
        token.refreshToken = refreshed.data.refreshToken;
        token.expiresAt = getRefreshTokenAfter();
      } catch (err) {
        console.error("Refresh token failed:", err);
        return token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        role: token.role,
      };
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/login", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/auth/welcome",
  },
};
