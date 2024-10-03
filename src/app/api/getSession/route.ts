// src/app/api/getSession.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '../../'; // Ensure this path is correct for your auth options

export async function GET(req: NextRequest) {
  const session = await getServerSession(req, authOptions); // Pass the auth options if required
  return NextResponse.json(session);
}
