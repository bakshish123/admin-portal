import { NextResponse } from 'next/server';
import Alumni from '@/app/models/alumni'; // Adjust the path if needed
import connectDB from '@/app/database/index'; // Adjust the path if needed

// GET: Fetch all alumni
export async function GET(req: Request) {
  try {
    await connectDB();
    const alumni = await Alumni.find().lean();
    const mappedAlumni = alumni.map((alum) => ({
      id: alum._id,
      ...alum,
    }));
    return NextResponse.json(mappedAlumni);
  } catch (error: unknown) {
    console.error('Failed to fetch alumni:', error);
    return NextResponse.json({ message: 'Failed to fetch alumni' }, { status: 500 });
  }
}

// DELETE: Remove an alumni
export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const alumniId = searchParams.get('id');

    const deletedAlumni = await Alumni.findByIdAndDelete(alumniId);
    if (!deletedAlumni) {
      return NextResponse.json({ message: 'Alumni not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Alumni deleted successfully' });
  } catch (error: unknown) {
    console.error('Failed to delete alumni:', error);
    return NextResponse.json({ message: 'Failed to delete alumni' }, { status: 500 });
  }
}
