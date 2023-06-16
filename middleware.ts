import { withAuth } from "next-auth/middleware"
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default withAuth(
    async function middleware(req: NextRequest) {
        const pathname = req.nextUrl.pathname;
        const isAuth = await getToken({req});
        
        const isRegisterPage = pathname.startsWith('/register');

        if(isRegisterPage) {
            if(isAuth) {
                return NextResponse.redirect(new URL('/', req.url));
            }
            return NextResponse.next()
        }

        if(pathname === '/') {
            if(isAuth) {
                return NextResponse.next()
            }
            return NextResponse.redirect(new URL('/login', req.url));
        }
        
    },
    {
        callbacks: {
            async authorized() {
                return true
            }
        }
    }
)

export const config = {
    matcher: ["/", '/register']
}