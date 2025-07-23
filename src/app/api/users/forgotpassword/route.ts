/*here we will get the email from the frontend, find the user with that email,
shoot an email with helper of type "RESET", now email will be sent and we will also
get the forgotpasstoken and expiry in user model
*/

import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";

connect()

export async function POST(request: NextRequest) {
    const reqBody = await request.json()
    const {email} = reqBody

    console.log(email);

    const user = await User.findOne({email})

    await sendEmail({email, emailType: "RESET", userId: user._id})

    return NextResponse.json({message: "Email sent to reset the password", success: true})
}