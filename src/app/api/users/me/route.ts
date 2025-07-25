import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect()

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request)

        const user = await User.findOne({_id: userId}).select("-password")

        return NextResponse.json({
            message: "User found",
            data: user
        })
    } catch (error: unknown) {
        if(error instanceof Error) {
            return NextResponse.json({error: error.message}, {status: 400})
        }
    }
}
