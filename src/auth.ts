import NextAuth, { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { getUserByEmail } from "./data/user";
import { compare } from "bcryptjs";

declare module "next-auth/jwt" {
    interface JWT {
        isAdmin: boolean;
    }
}

declare module "next-auth" {
    interface Session {
        user: {
            isAdmin: boolean;
        } & DefaultSession["user"];
    }

    interface User {
        isAdmin?: boolean;
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: "/auth/login",
    },
    session: { strategy: "jwt" },
    adapter: PrismaAdapter(prisma),
    events: {
        linkAccount: async ({ user }) => {
            await prisma.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            });
        },
    },
    callbacks: {
        jwt: ({ token, user }) => {
            if (user && user.isAdmin) {
                token.isAdmin = user.isAdmin || false;
            }

            return token;
        },

        session: ({ session, token }) => {
            session.user.isAdmin = token.isAdmin;

            return session;
        },
    },
    providers: [
        Credentials({
            credentials: {
                email: { label: "email", type: "email" },
                password: { label: "password", type: "password" },
            },
            authorize: async (credentials) => {
                const { email, password } = credentials;

                const user = await getUserByEmail(email as string);

                if (!user || !user.password) {
                    return null;
                }

                const { password: userPassword } = user;

                const passwordMatched = await compare(
                    password as string,
                    userPassword as string
                );

                if (passwordMatched) {
                    return user;
                }

                return null;
            },
        }),
        Google,
    ],
});
