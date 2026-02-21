import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    console.log("MIDDLEWARE RODANDO:", request.nextUrl.pathname)
    const token = request.cookies.get("session_token")?.value
    console.log(token)

  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/client") ||
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/service") ||
    request.nextUrl.pathname.startsWith("/serviceorder")


    if(isProtectedRoute && !token) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    return NextResponse.next()
}


export const config = {
    matcher: ["/client/:path*", "/dashboard/:path*", "/service/:path*", "/serviceorder/:path*"]
}