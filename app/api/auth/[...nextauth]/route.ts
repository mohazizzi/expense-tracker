import NextAuth from "next-auth/next";
import { compare } from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { connectToMondoDB } from "@/lib/dbConnect";
import User from "@/models/user";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { userName, password } = credentials as {
          userName: String;
          password: String;
        };

        console.log("this is my username", userName);
        console.log(password);

        try {
          await connectToMondoDB();
          const user = await User.findOne({ userName }).exec();
          if (!user) throw new Error("no user");
          const passwordMatch = await compare(
            password as string,
            user.password
          );
          if (!passwordMatch) throw new Error("no pass match");
          return user;
        } catch (error) {
          throw new Error(`there an err ${error as any}`);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
