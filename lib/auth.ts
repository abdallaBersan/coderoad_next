import NextAuth from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "@/lib/zod";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.username || !credentials?.password) {
            return null;
          }

          const { username, password } = await signInSchema.parseAsync(
            credentials
          );

          // Recherchez l'utilisateur dans la base de données
          const existingUser = await prisma.user.findUnique({
            where: { username: username },
          });

          if (!existingUser) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(
            password,
            existingUser.password
          );

          if (!passwordMatch) {
            return null;
          }

          return {
            id: existingUser.id,
            username: existingUser.username,
          };
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    signOut: "/signout",
    error: "/signin",
    newUser: "/register",
  },
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          // id: token.id as string,
          username: token.username as string,
        },
      };
    },
    async jwt({ token, user, session, trigger }) {
      if (trigger === "update" && session?.name !== token.name) {
        token.name = session.name;
      }

      if (user) {
        return {
          ...token,
          username: user.username,
        };
      }
      return token;
    },
  },
});
