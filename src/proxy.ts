import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { logger } from "./lib/logger";

// Helper function to check if the path is not accessible to logged-in users
const isLoggedInUserRestrictedPath = (pathname: string) => {
  return pathname === "/login" || pathname.startsWith("/register") || pathname === "/";
};

// Helper function to handle redirection
const redirectTo = (url: string, request: NextRequest) => {
  return NextResponse.redirect(new URL(url, request.url));
};

export async function proxy(request: NextRequest) {
  const authToken = await getToken({ req: request });
  logger.log("🚀 ~ proxy ~ authToken:", authToken)
  const { pathname } = request.nextUrl;

  // If the user is logged in and tries to access restricted paths
  if (isLoggedInUserRestrictedPath(pathname)) {
    if (authToken) {
        return;
    //   return redirectTo("/dashboard", request);
    }
  }

  // If trying to access any other restricted paths without being logged in
  if (!authToken && pathname.startsWith("/dashboard")) {
    return redirectTo("/login", request);
  }
}

export const config = {
  matcher: ["/login", "/register/:path*", "/dashboard/:path*"],
};
