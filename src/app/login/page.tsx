"use client"

import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function LoginPage () {
    const router = useRouter()
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user)
            console.log(response)
            router.push("/profile")

        } catch (error: any) {
            console.log("Login Failed", error.message)
        } finally {
            setLoading(false)
        }
    }

    const forgotPassword = async () => {
        router.push('/forgotpassword')
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-600">
            <div className="bg-white/90 shadow-2xl rounded-2xl p-10 w-full max-w-md">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-2 tracking-tight">
                    {loading ? "Processing..." : "Login"}
                </h1>
                <p className="text-center text-gray-500 mb-8">Welcome back! Please login to your account.</p>
                <form className="flex flex-col gap-6">
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Email</label>
                        <input 
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all text-gray-800 bg-gray-50 placeholder-gray-400"
                            id="email"
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser({...user, email: e.target.value})}
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">Password</label>
                        <input 
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all text-gray-800 bg-gray-50 placeholder-gray-400"
                            id="password"
                            type="password"
                            value={user.password}
                            onChange={(e) => setUser({...user, password: e.target.value})}
                            placeholder="Enter your password"
                        />
                    </div>
                    <button 
                        type="button"
                        onClick={onLogin}
                        disabled={buttonDisabled || loading}
                        className={`w-full py-3 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold text-lg shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-violet-400 ${buttonDisabled || loading ? 'opacity-60 cursor-not-allowed' : 'hover:from-violet-600 hover:to-purple-700 cursor-pointer'}`}
                    >
                        Login
                    </button>
                    <button 
                        type="button"
                        onClick={forgotPassword}
                        className="cursor-pointer w-full py-3 rounded-lg border border-violet-500 text-violet-700 font-semibold text-lg shadow-md hover:bg-violet-50 transition-all focus:outline-none focus:ring-2 focus:ring-violet-400"
                    >
                        Forgot Password
                    </button>
                </form>
                <div className="mt-8 text-center">
                    <span className="text-gray-600">Don't have an account? </span>
                    <Link href="/signup" className="text-violet-600 font-semibold hover:underline">Sign up</Link>
                </div>
            </div>
        </div>
    )
}