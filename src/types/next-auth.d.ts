
import 'next-auth';
import { DefaultUser, DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string; // Add custom fields here
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: string; // Add custom fields here
    role: string;
  }
}