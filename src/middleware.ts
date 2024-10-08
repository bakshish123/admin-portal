// middleware.ts (or your designated middleware file)

import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Middleware function
export async function middleware(req: NextRequest) {
    console.log("Middleware triggered for path:", req.nextUrl.pathname);
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    console.log('Token:', token); // Log the token to check its value
  
    if (!token) {
      console.log('No token found, redirecting to login.');
      return NextResponse.redirect(new URL("/login", req.url));
    }
  
    if (!token.isAlumni) {
      console.log('User is not an alumni, redirecting to unauthorized.');
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  
    console.log('Access granted to /createAlumni.');
    return NextResponse.next();
  }

// Specify paths that this middleware should run on
export const config = {
  matcher: ["/createAlumni"], // Adjust as needed for your routing structure
};