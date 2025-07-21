import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";

connect()

export async function POST(request: NextRequest) {
    try {
        //get token from body
        const reqBody = await request.json()
        const {token} = reqBody

        console.log(token)

        //find user with token
        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})

        if(!user) {
            return NextResponse.json({error: "User not found"}, {status: 400})
        }

        console.log(user);
        
        //set isVerified as true
        user.isVerified = true

        //empty the verifyToken as user is verified so there is no need of that
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        //save the changes
        await user.save()

        //return the response
        return NextResponse.json({
            message: "Email verified",
            success: true
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}