import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname       //current path we are at

    const isPublicPath = path === '/login' || path === '/signup' || path ==='/verifyemail'        //checking if current path is public

    const token = request.cookies.get('token')?.value || ''       //getting value of token

    if(isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    if(!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}

export const config = {
    matcher: [
        '/',
        '/profile/:path*',
        '/login',
        '/signup',
        '/verifyemail'
    ]
}