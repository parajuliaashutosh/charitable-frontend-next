import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { AuthRole } from "./constants/role.enum";
import { logger } from "./lib/logger";

// Helper function to check if the path is not accessible to logged-in users
const isLoggedInUserRestrictedPath = (pathname: string) => {
  console.log("🚀 ~ isLoggedInUserRestrictedPath ~ pathname:", pathname)
  return (
    pathname === "/login" ||
    pathname.startsWith("/register") ||
    pathname === "/"
  );
};

// Helper function to handle redirection
const redirectTo = (url: string, request: NextRequest) => {
  return NextResponse.redirect(new URL(url, request.url));
};

export async function proxy(request: NextRequest) {
  const authToken = await getToken({ req: request });
  logger.log("🚀 ~ proxy ~ authToken:", authToken);
  const { pathname } = request.nextUrl;

  // If trying to access any other restricted paths without being logged in
  if (
    !authToken &&
    (pathname.startsWith("/dashboard") || pathname.startsWith("/donate"))
  ) {
    return redirectTo("/login", request);
  }

  // If the user is logged in and tries to access restricted paths
  if (authToken && isLoggedInUserRestrictedPath(pathname)) {
    switch (authToken.role) {
      case AuthRole.SUDO_ADMIN:
      case AuthRole.ADMIN:
        return redirectTo("/dashboard", request);
      case AuthRole.ORGANIZATION_SUPER_ADMIN:
      case AuthRole.ORGANIZATION_ADMIN:
        return redirectTo("/donations", request);
      case AuthRole.USER:
        return redirectTo("/donate", request);
      default:
        return redirectTo("/login", request);
    }
  }
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register/:path*",
    "/dashboard/:path*",
    "/donate",
    "/donations",
  ],
};
