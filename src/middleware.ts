import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Define the admin email
const adminEmail = "bakshish10621@gmail.com";

// Middleware function
export async function middleware(req: NextRequest) {
  console.log("Middleware triggered for path:", req.nextUrl.pathname);
  
  // Get the token from the request
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("Token:", token); // Log the token to check its value

  // Check for the path and handle accordingly
  if (req.nextUrl.pathname === "/createAlumni") {
    // Logic for createAlumni route
    if (!token) {
      console.log("No token found, redirecting to login.");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Allow access if the user is an alumni or an admin
    if (!token.isAlumni && token.email !== adminEmail) {
      console.log("User is not an alumni or admin, redirecting to unauthorized.");
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

  } else if (req.nextUrl.pathname.startsWith("/admin")) {
    // Logic for admin routes
    if (!token) {
      console.log("No token found, redirecting to login.");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (token.email !== adminEmail) {
      console.log("User is not an admin, redirecting to unauthorized.");
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  console.log("Access granted to", req.nextUrl.pathname);
  return NextResponse.next();
}

// Specify paths that this middleware should run on
export const config = {
  matcher: ["/createAlumni", "/admin/:path*"], // Adjust as needed for your routing structure
};
