"use client"

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState('nothing')
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            console.log("Logout successful");
            router.push("/login")
        } catch (error: any) {
            console.log(error.message)
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data)
        setData(res.data.data._id)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-600">
            <div className="bg-white/90 shadow-2xl rounded-2xl p-10 w-full max-w-md flex flex-col items-center">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-2 tracking-tight">Profile</h1>
                <p className="text-center text-gray-500 mb-8">Welcome to your profile page.</p>
                <div className="w-full flex flex-col items-center gap-4 mb-6">
                    <span className="text-lg text-gray-700 font-semibold">User ID:</span>
                    <h2 className="w-full text-center bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-3 px-4 rounded-lg shadow-md">
                        {data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}
                    </h2>
                </div>
                <div className="w-full flex flex-col gap-4">
                    <button 
                        onClick={logout}
                        className="cursor-pointer w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold text-lg shadow-md hover:from-blue-600 hover:to-violet-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >Logout</button>
                    <button 
                        onClick={getUserDetails}
                        className="cursor-pointer w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold text-lg shadow-md hover:from-green-600 hover:to-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-green-400"
                    >Get user details</button>
                </div>
            </div>
        </div>
    )
}