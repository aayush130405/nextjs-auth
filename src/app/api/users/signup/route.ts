import {connect} from "@/dbConfig/dbConfig"         //importing connect function to connect DB
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"     //similar to req, res of express
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer"

connect()       //connecting DB

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        console.log("Request body:", reqBody);

        //check if user already exists
        const user = await User.findOne({email})

        if(user) {
            return NextResponse.json({error: "User already exists"}, {status: 400}) 
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        //create new user with provided body
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        //saving created user in DB
        const savedUser = await newUser.save()
        console.log(savedUser);

        //send verification email
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})
        
        return NextResponse.json({
            message: "Created user successfully",
            success: true,
            savedUser      
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status:500})
    }
}  