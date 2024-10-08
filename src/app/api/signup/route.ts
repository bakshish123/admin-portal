import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '../../database';
import User from '../../models/genericUser';

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { email, password, dob, rollNumber, isAlumni } = await req.json(); 
    console.log('Parsed request body:', { email, password, dob, rollNumber, isAlumni });

    // Ensure required fields are present
    if (!email || !password || !dob || !rollNumber) {
      console.log('Missing required fields');
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Connect to the database
    await dbConnect();
    console.log('Connected to the database.');

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email);
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully.');

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
    console.log('User saved to database:', newUser);

    // Return a success response
    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}
