"use client"

import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function SignUpPage () {
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", user)
            console.log("Signup success", response.data);
            router.push("/login")
        } catch (error: unknown) {
            if(error instanceof Error) {
                console.log("Signup failed", error.message);
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-600">
            <div className="bg-white/90 shadow-2xl rounded-2xl p-10 w-full max-w-md">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-2 tracking-tight">
                    {loading ? "Processing..." : "Sign Up"}
                </h1>
                <p className="text-center text-gray-500 mb-8">Create your account to get started.</p>
                <form className="flex flex-col gap-6">
                    <div>
                        <label htmlFor="username" className="block text-gray-700 font-semibold mb-1">Username</label>
                        <input 
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all text-gray-800 bg-gray-50 placeholder-gray-400"
                            id="username"
                            type="text"
                            value={user.username}
                            onChange={(e) => setUser({...user, username: e.target.value})}
                            placeholder="Enter your username"
                        />
                    </div>
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
                        onClick={onSignup}
                        disabled={buttonDisabled || loading}
                        className={`w-full py-3 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold text-lg shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-violet-400 ${buttonDisabled || loading ? 'opacity-60 cursor-not-allowed' : 'hover:from-violet-600 hover:to-purple-700 cursor-pointer'}`}
                    >
                        {buttonDisabled ? "No signup" : "Signup"}
                    </button>
                </form>
                <div className="mt-8 text-center">
                    <span className="text-gray-600">Already have an account? </span>
                    <Link href="/login" className="text-violet-600 font-semibold hover:underline">Login</Link>
                </div>
            </div>
        </div>
    )
}