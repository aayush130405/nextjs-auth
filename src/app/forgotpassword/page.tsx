//in this page the user will enter their email and then we will use axios.post to throw that email in to forgotpassword api

"use client"

import React, { useState } from "react"
import axios from "axios"

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("")

    const submitFieldsToApi = async () => {
        const res = await axios.post('/api/users/forgotpassword', {email})
        console.log(res);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-600">
            <div className="bg-white/90 shadow-xl rounded-2xl p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Forgot Password?</h1>
                <p className="text-center text-gray-500 mb-8">Enter your email address and we'll send you a link to reset your password.</p>
                <form className="flex flex-col gap-6">
                    <input
                        type="email"
                        className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all text-gray-800 bg-gray-50 placeholder-gray-400"
                        placeholder="Enter your email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        className="cursor-pointer w-full py-3 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold text-lg shadow-md hover:from-violet-600 hover:to-purple-700 transition-all focus:outline-none focus:ring-2 focus:ring-violet-400"
                        onClick={submitFieldsToApi}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}
