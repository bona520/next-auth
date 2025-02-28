import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import { setCookie } from 'cookies-next';

export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_SECRET || ""
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID || "",
            clientSecret: process.env.FACEBOOK_SECRET || ""
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            console.log('account signed in:', account);
            // console.log('user signed in:', user);
            console.log('profile:', profile);
            return true;
        },
        async session({ session, token }) {
            session.token = token.accessToken
            console.log('session:', session);
            return session
        },
    },
}