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

        return {
          id: user._id.toString(),
          email: user.email,
          rollNumber: user.rollNumber,
          role: user.isAlumni ? 'Alumni' : 'Student',
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.role = user.role || '';
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};

export default NextAuth(options);
