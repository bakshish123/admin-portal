import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { AuthOptions } from "next-auth";
import bcrypt from 'bcryptjs';
import User from "@/app/models/genericUser";
import dbConnect from "@/app/database";

export const options: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        rollNumber: { label: "Roll Number", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.rollNumber || !credentials?.password) {
          throw new Error('Roll number and password are required');
        }

        // Connect to the database
        await dbConnect();

        // Find user by roll number
        const user = await User.findOne({ rollNumber: credentials.rollNumber });
        if (!user) {
          throw new Error('Invalid roll number or password');
        }

        // Compare passwords
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error('Invalid roll number or password');
        }

        // Return user object with alumni status
        return {
          id: user._id.toString(),
          email: user.email,
          rollNumber: user.rollNumber,
          name: user.email,  // Optional: you can set name here or remove it
          isAlumni: user.isAlumni,  // Alumni status
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        // Attach isAlumni to the token
        token.isAlumni = user.isAlumni;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        // Attach isAlumni to the session
        (session.user as any).isAlumni = token.isAlumni; // TypeScript doesn't know this field, so we cast it
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',  // Custom sign-in page
  },
};