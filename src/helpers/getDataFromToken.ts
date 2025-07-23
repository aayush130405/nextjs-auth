import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"

export const getDataFromToken = async (request: NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || ''
        const decodedToken = await jwt.verify(token, process.env.TOKEN_SECRET!) as { id: string }
        return decodedToken.id
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
    }
}


//THIS FUNCTION WILL RETURN THE USER ID