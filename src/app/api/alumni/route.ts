import { NextResponse } from 'next/server';
import Alumni from '../../models/alumni'; // Adjust the path if needed
import connectDB from '../../database/index'; // Adjust the path if needed

export async function GET(req: Request) {
  try {
    // Connect to the database
    await connectDB();

    // Extract query parameters from the request
    const { searchParams } = new URL(req.url);
    const degree = searchParams.get('degree') || '';
    const jobTitle = searchParams.get('jobTitle') || '';
    const currentCompany = searchParams.get('currentCompany') || '';

    // Build the query object dynamically based on filters
    const query: any = {};
    if (degree) query.degree = { $regex: degree, $options: 'i' }; // Case-insensitive matching
    if (jobTitle) query.jobTitle = { $regex: jobTitle, $options: 'i' };
    if (currentCompany) query.currentCompany = { $regex: currentCompany, $options: 'i' };

    // Fetch filtered alumni data
    const alumni = await Alumni.find(query).lean(); // Use lean() to get plain JS objects

    // Log the fetched data for debugging
    console.log('Fetched alumni data:', alumni);

    // Return an array of alumni
    return NextResponse.json(alumni);
  } catch (error) {
    console.error('Failed to fetch alumni:', error);
    return NextResponse.json({ message: 'Failed to fetch alumni', error }, { status: 500 });
  }
}
