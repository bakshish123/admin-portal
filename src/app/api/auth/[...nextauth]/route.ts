// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Replace this with your actual API call to authenticate the user
        const res = await fetch('https://your-backend-api.com/auth/login', {
          method: 'POST',
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { 'Content-Type': 'application/json' },
        });

        const user = await res.json();

        // If login is successful, return the user object
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved or login fails
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Save the user ID in the token if it exists
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        // Add the ID from the token to the session's user object
        session.user.id = token.id as string; // Ensure ID is a string
      }
      return session;
    },
  },
  pages: {
    signIn: '/login', // Your custom login page route
  },
  session: {
    strategy: 'jwt',
  },
};

// Make sure to pass the req and res to NextAuth
export async function GET(req: Request) {
  return NextAuth(req, authOptions);
}

export async function POST(req: Request) {
  return NextAuth(req, authOptions);
}
