/*we will move on to this page, after user clicks the resetpassword 
link on the email received, in this page, we will have a new pass and 
confirm new pass input field and submit button, on button click the 
new pass is passed to api using axios.post
*/

"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"

export default function ResetPasswordPage() {
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [token, setToken] = useState("")
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        } else {
            setError("");
            console.log("Passwords match. Proceeding...");
            const res = await axios.post('/api/users/resetpassword', {newPassword, token})
            console.log(res);
            setSuccess(true)
        }
        
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-600">
            <div className="bg-white/90 shadow-xl rounded-2xl p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Reset Password</h1>
                <p className="text-center text-gray-500 mb-8">Enter your new password below.</p>
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <input
                        type="password"
                        className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all text-gray-800 bg-gray-50 placeholder-gray-400"
                        placeholder="New password"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all text-gray-800 bg-gray-50 placeholder-gray-400"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="cursor-pointer w-full py-3 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold text-lg shadow-md hover:from-violet-600 hover:to-purple-700 transition-all focus:outline-none focus:ring-2 focus:ring-violet-400"
                    >
                        Submit
                    </button>
                </form>
                {error && (
                    <div className="mt-4 text-center text-red-600 font-semibold bg-red-100 rounded-lg py-2">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mt-4 text-center text-green-600 font-semibold bg-green-100 rounded-lg py-2">
                        Password changed successfully! You can now <a href="/login" className="underline">log in</a>.
                    </div>
                )}
            </div>
        </div>
    )
}
