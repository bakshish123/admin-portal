import { NextResponse } from 'next/server';
import Alumni from '../../models/alumni'; // Adjust the path if needed
import connectDB from '../../database/index'; // Adjust the path if needed

export async function GET() {
  try {
    // Connect to the database
    await connectDB();

    // Fetch all alumni data
    const alumni = await Alumni.find({}).lean(); // Use lean() to get plain JS objects

    // Log the fetched data for debugging
    console.log('Fetched alumni data:', alumni);

    // Return an array of alumni
    return NextResponse.json(alumni);
  } catch (error) {
    console.error('Failed to fetch alumni:', error);
    return NextResponse.error(); // Return a generic error response
  }
}
