

import type { NextApiRequest, NextApiResponse } from 'next';
import Alumni from '../../models/alumni';
import connectDB from '../../database/index'; // Function to handle MongoDB connection

import { NextResponse } from 'next/server';


// Function to handle POST requests
export async function POST(request: Request) {
  try {
    // Connect to the database
    await connectDB();

    // Parse the request body
    const data = await request.json();

    // Create a new alumni record using the data from the request body
    const newAlumni = new Alumni(data);
    await newAlumni.save();

    // Return a successful response
    return NextResponse.json({ message: 'Alumni created successfully!' }, { status: 201 });
  } catch (error) {
    console.error('Error creating alumni:', error);

    // Return an error response in case of failure
    return NextResponse.json({ message: 'Failed to create alumni' }, { status: 500 });
  }
}
