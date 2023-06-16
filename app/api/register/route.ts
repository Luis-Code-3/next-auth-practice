import { NextResponse } from "next/server";
import prisma from "../../lib/prismadb"
import bcrypt from "bcrypt"

export async function POST(request:Request) {
    const {username, email, password} = await request.json();

    // P: Only if user is logged out
    // P: Prevent from creating if exitsing accounts exist

    if(!username || !email || !password) {
        return NextResponse.json({message: "All Fields are Required."}, {status: 400})
    }

    try {
        // Prisma logic to check if exist user exists
        // bcrypt to hash password
        // Prisma Logic to create user

        const existUser = await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        email: email
                    },
                    {
                        username: username
                    }
                ]
            }
        });

        if(existUser) {
            return NextResponse.json({message: "User already exists"}, {status: 400})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                email,
                hashedPassword
            }
        });



        return NextResponse.json({user ,message: "Created User"}, {status: 201});
    } catch (err) {
        console.log(err);
        return NextResponse.json({message: "Error"}, {status: 500});
    }
}