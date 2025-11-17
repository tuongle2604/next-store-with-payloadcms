import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { decrypt, updateSession } from "./lib/auth";

const authenticatedPaths = ["/account", "/orders", "/cart"];
const redirectPaths = ["/login", "/register", "/forgot-password"];

export async function middleware(request: NextRequest) {
  // const token = request.cookies.get("payload-token")?.value;
  // const isLoggedIn = Boolean(token);
  // const { pathname } = request.nextUrl;

  // if (
  //   !isLoggedIn &&
  //   authenticatedPaths.some((path) => pathname.startsWith(path))
  // ) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // if (isLoggedIn && redirectPaths.some((path) => pathname.startsWith(path))) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
