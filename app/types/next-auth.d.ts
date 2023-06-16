import type { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";

interface MyAdapterUser extends User {
  role: string;
}

type UserId = string;

declare module 'next-auth/jwt' {
    interface JWT {
        id: string
        role: string
        isNewUser? : boolean
    }
}

declare module 'next-auth' {
    interface Session {
        user: User & {
            id: UserId
            role: string
            isNewUser? : boolean
        }
    }
}