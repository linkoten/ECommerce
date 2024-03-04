import NextAuth, { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';

const githubID = process.env.GITHUB_ID;
const githubSecret = process.env.GITHUB_SECRET;

const googleID = process.env.GOOGLE_ID;
const googleSecret = process.env.GOOGLE_SECRET;

if (!githubID || !githubSecret) {
    throw new Error(
        'Missing GITHUB_ID or GITHUB_SECRET environement'
    );
}

if (!googleID || !googleSecret) {
    throw new Error(
        'Missing GOOGLE_ID or GOOGLE_SECRET environement'
    );
}

export const authConfig = {
    providers: [
        GitHubProvider({
            clientId: githubID,
            clientSecret: githubSecret,
        }),
        GoogleProvider({
            clientId: googleID,
            clientSecret: googleSecret,
        }),
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
        }),
    ],
    callbacks: {
        session: async ({ session, user }) => {
            console.log(session, user);
            if (session.user) {
                session.user.id = user.id;
            }
            return session;
        },
    },

    adapter: PrismaAdapter(prisma),
} satisfies NextAuthOptions;

export default NextAuth(authConfig);
