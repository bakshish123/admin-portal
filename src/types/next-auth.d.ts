// types/next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    rollNumber: string;
    name: string;
    isAlumni: boolean;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      rollNumber: string;
      name: string;
      isAlumni: boolean;
    };
  }

  interface JWT {
    id: string;
    email: string;
    rollNumber: string;
    name: string;
    isAlumni: boolean;
  }
}
