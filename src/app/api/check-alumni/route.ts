import { NextResponse } from 'next/server';
import dbConnect from '@/app/database/index';  // MongoDB connection
import Alumni from '@/app/models/alumni';  // Alumni model
import User from '@/app/models/genericUser';  // User model

// Named export for the GET method
export async function GET(request: Request) {
  try {
    // Connect to the database
    await dbConnect();

    // Extract rollNumber from the query string
    const { searchParams } = new URL(request.url);
    const rollNumber = searchParams.get('rollNumber');

    if (!rollNumber) {
      return NextResponse.json({ message: "Roll number is required" }, { status: 400 });
    }

    // Find the user by roll number
    const user = await User.findOne({ rollNumber });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if the user is an alumni
    if (user.isAlumni) {
      // Query the Alumni model to check if alumni exists
      const alumni = await Alumni.findOne({ rollNumber });

      if (alumni) {
        return NextResponse.json({ isAlumni: true, alumniExists: true });
      } else {
        return NextResponse.json({ isAlumni: true, alumniExists: false });
      }
    } else {
      return NextResponse.json({ isAlumni: false });
    }
  } catch (error) {
    console.error("Error checking alumni status:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
