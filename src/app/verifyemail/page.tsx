"use client"

import axios from "axios"
import Link from "next/link"
import React, {useEffect, useState} from "react"

export default function VerifyEmailPage() {
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
    }, [])

    useEffect(() => {
        if(token.length > 0) {
            const verifyUserEmail = async () => {
                try {
                    await axios.post('/api/users/verifyemail', {token})
                    setVerified(true)
                } catch (error: unknown) {
                    setError(true)
                    if (error instanceof Error) {
                        console.log(error.message);
                    }
                }
            }
            verifyUserEmail();
        }
    }, [token])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-600">
            <div className="bg-white/90 shadow-2xl rounded-2xl p-10 w-full max-w-md flex flex-col items-center">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-4 tracking-tight">Verify Email</h1>
                <h2 className="p-2 mb-6 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg text-center text-lg font-semibold w-full overflow-x-auto whitespace-nowrap break-all">
                    {token ? `${token}` : "No token"}
                </h2>
                {verified && (
                    <div className="w-full flex flex-col items-center gap-4">
                        <h2 className="text-2xl text-green-700 font-bold mb-2">Email Verified</h2>
                        <Link href="/login" className="w-full py-3 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold text-lg shadow-md text-center hover:from-violet-600 hover:to-purple-700 transition-all focus:outline-none focus:ring-2 focus:ring-violet-400">
                            Login
                        </Link>
                    </div>
                )}
                {error && (
                    <div className="w-full mt-4 text-center text-red-600 font-semibold bg-red-100 rounded-lg py-2">
                        Error verifying email. Please try again.
                    </div>
                )}
            </div>
        </div>
    )
}