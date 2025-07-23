/*
here firstly we will receive the new pass from the frontend, and we will 
get the token from the URL using window.search.split("?")[1], then we will 
get the user from the DB with the same forgotpass token, once received we will 
then hash the new pass that is received using bcrypt, then we will update the password
field of the user model with the newly hashed password
*/

import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";

connect()

export async function POST(request: NextRequest) {
    const reqBody = await request.json()
    const {token, newPassword} = reqBody

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(newPassword, salt)

    const user = await User.findOneAndUpdate({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}}, {
        password: hashedPassword,
        forgotPasswordToken: "",
        forgotPasswordTokenExpiry: ""
    }, {new: true})

    if(!user) {
        return NextResponse.json({message: "User not found", success: false})
    }

    return NextResponse.json({message: "Password changed successfully", success: true, status: 200})

    

    
}