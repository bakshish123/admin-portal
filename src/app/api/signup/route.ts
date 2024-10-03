// pages/api/signup.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '../../database';
import User, { IUser } from '../../models/user';

// Named export for the POST method
export async function POST(req: NextRequest) {
  try {
    // Parse the request body (ensure this is correctly retrieving the body)
    const { email, password, dob, rollNumber, isAlumni } = await req.json(); 

    // Connect to the database
    await dbConnect();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      email,
      password: hashedPassword,
      dob,
      rollNumber,
      isAlumni
    });

    // Save the user to the database
    await newUser.save();

    // Return a success response
    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}
