import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeJWT } from "@/lib/auth";

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

// export const config = {
//   matcher: ["/account/:path*", "/account"],
// };
