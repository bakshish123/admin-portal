import { NextResponse } from 'next/server';
import User from '@/app/models/genericUser';
import Alumni from '@/app/models/alumni'; // Adjust the path if needed
import connectDB from '@/app/database/index'; // Adjust the path if needed

// GET: Fetch all users
export async function GET() {
  try {
    await connectDB();
    const users = await User.find().lean();
    const mappedUsers = users.map((user) => ({
      id: user._id,
      ...user,
    }));
    return NextResponse.json(mappedUsers);
  } catch (error: unknown) {
    console.error('Failed to fetch users:', error);
    return NextResponse.json({ message: 'Failed to fetch users' }, { status: 500 });
  }
}

// PUT: Verify or revoke alumni status
export async function PUT(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('id');
    const { rollNumber } = await req.json();

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Check if the roll number is valid
    const alumni = await Alumni.findOne({ rollNumber });
    if (!alumni) {
      return NextResponse.json({ message: 'Invalid roll number' }, { status: 400 });
    }

    // Update the user's isAlumni status
    user.isAlumni = !user.isAlumni; // Toggle the alumni status
    await user.save();

    return NextResponse.json({ user });
  } catch (error: unknown) {
    console.error('Failed to update user alumni status:', error);
    return NextResponse.json({ message: 'Failed to update user status' }, { status: 500 });
  }
}

// DELETE: Remove a user
export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('id');

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error: unknown) {
    console.error('Failed to delete user:', error);
    return NextResponse.json({ message: 'Failed to delete user' }, { status: 500 });
  }
}
