import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";
import prisma from "../../../lib/prismadb"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcrypt"
import { MyAdapterUser } from "../../../types/next-auth";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: '/login',
    },
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {label: 'email', type: "text"},
                password: {label: 'password', type: 'password'},
                username: {label: 'username', type: 'text'}
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password) {
                    throw new Error('Missing Fields');
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if(!user || !user?.hashedPassword) {
                    throw new Error('Invalid Credentials');
                }

                const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);

                if(!isCorrectPassword) {
                    throw new Error("Invalid Credentials");
                }

                return user;
            }
        })
    ],
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async signIn({user, account, profile, email, credentials}) {
            // console.log("USER:", user);
            // console.log("ACCOUNT:", account);
            // console.log("PROFILE:", profile);
            // console.log("EMAIL:", email);
            // console.log("CREDENTIALS:", credentials);
            
            // console.log("1ST!!");
            return true
        },
        async jwt({token, user, account, profile, trigger}) {
            // console.log("USER:", user);
            // console.log("ACCOUNT:", account);
            // console.log("PROFILE:", profile);
            // console.log("TRIGGER",trigger);
            // console.log("TOKEN", token);
            

            

            // console.log("2ND!!");

            if (trigger === 'update') {
                delete token.isNewUser;
            }
            

            if (user) {
                let myUser = user as MyAdapterUser;
                token.role = myUser.role;
                token.id = myUser.id;
                if(trigger === 'signUp' && (account?.provider === 'github' || account?.provider === 'google')) {
                    token.isNewUser = true;
                }
            }
            
            return token
        },
        async session({token, session, user}) {
            // console.log("USER:", user);
            // console.log("TOKEN:", token);
            // console.log("SESSION:", session);
            // console.log("TRIGGER2",trigger);
            // console.log("3RD!!");
            
            if (token) {
                session.user.role = token.role;
                session.user.id = token.id;
                if(token.isNewUser) {
                    session.user.isNewUser = token.isNewUser
                }
            }

            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};