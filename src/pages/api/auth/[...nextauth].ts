import NextAuth, {NextAuthOptions, Session, User} from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUserByEmail } from '@/controllers/user.controller';
import { IUser } from '@/models/user.model';
import bcrypt from 'bcryptjs';
import { NextApiHandler } from 'next';

interface Credentials{
    email: string;
    password: string;
}
export interface MySession extends Session{
    user:{
        id: string,
        name: string,
        email: string,
        isAdmin: boolean,
        likedProblems: [],
        dislikedProblems: [],
        solvedProblems: [],
        starredProblems: [],
    }
}
interface MyUser extends User{
    id: string,
    name: string,
    email: string,
    isAdmin: boolean,
    likedProblems?: [],
    dislikedProblems?: [],
    solvedProblems?: [],
    starredProblems?: [],
}
export const options: NextAuthOptions = {
    session:{
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = token.user as MyUser;
            }
            return Promise.resolve(session);
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        Credentials({
            id: 'credentials',
            name: 'credentials',
            credentials:{
                email: {label:'email', type:'text',placeholder:''},
                password:{label:'password',type:'password'}
            },
            async authorize(credentials) {
                const { email, password } = credentials as Credentials;
                const user = await getUserByEmail(email);
                if (!user) {
                    throw new Error("No User Found");
                }
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    throw new Error("Password doesn't Match");
                }
                return {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                };
            },
        })
    ],
}
const Handler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default Handler;
