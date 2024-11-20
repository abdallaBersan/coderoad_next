import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";

const authConfig = {
  providers: [],
  callbacks: {
    authorized({ request, auth }: any) {
      const protectedPaths = [
        // /\/profile/,
        /\/users\/(.*)/,
        /\/roadmaps\/(.*)/,
      ];
      const { pathname } = request.nextUrl;
      if (protectedPaths.some((p) => p.test(pathname))) return !!auth;
      return true;
    },
  },
} satisfies NextAuthConfig;

export const { auth: middleware } = NextAuth(authConfig);
