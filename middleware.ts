import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { decrypt } from "./app/actions/auth";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session_token")?.value;

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      await decrypt(session);
      return NextResponse.next();
    } catch (e) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  return NextResponse.next();
}

// Configura em quais rotas o middleware deve agir
export const config = {
  matcher: ["/dashboard/:path*"],
};
