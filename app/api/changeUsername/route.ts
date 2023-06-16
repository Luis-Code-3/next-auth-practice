import { NextResponse } from "next/server";
import prisma from "../../lib/prismadb"

export async function POST(request:Request) {
    const {username, email} = await request.json();

    // P: Only if user is logged in
    // P: Prevent from creating if exitsing username's exist

    if(!username) {
        return NextResponse.json({message: "Field is Required."}, {status: 400})
    }

    try {
        // Prisma logic to check if exist user exists
        // Prisma Logic to update user

        const existUser = await prisma.user.findUnique({
            where: {
                username: username
            }
        });

        if(existUser) {
            return NextResponse.json({message: "Username already taken"}, {status: 400})
        }

        const user = await prisma.user.update({
            where: {
                email: email
            },
            data: {
                username
            }
        });



        return NextResponse.json({user ,message: "Username Updated"}, {status: 201});
    } catch (err) {
        console.log(err);
        return NextResponse.json({message: "Error"}, {status: 500});
    }
}