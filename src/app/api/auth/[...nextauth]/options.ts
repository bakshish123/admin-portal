import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import NextAuth, { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

interface UserRole extends Record<string, any> {
  role?: string;  // Define the role property as optional here
}

// Define the auth options
export const options: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      profile(profile) {
        let userRole: string = "github user";
        if (profile?.email === 'bakshish10621@gmail.com') {
          userRole = 'admin';
        }
        return {
          id: profile.id.toString(), // Convert id to string
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
          role: userRole,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      profile(profile) {
        console.log("Profile Google: ", profile);

        let userRole: string = "Google User";
        return {
          id: profile.sub,  // Google profile has `sub` as the unique identifier
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: userRole,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }: { user?: UserRole; token: JWT }) {
      if (user) {
        // Ensure that the role property is defined and properly typed
        token.role = user.role || ''; // Default to empty string if role is undefined
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session?.user) {
        // Ensure that role property is a string
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};

export default NextAuth(options);
