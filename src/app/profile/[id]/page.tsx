import  {PageProps}  from "next";

export default function UserProfile({params}: PageProps<{params: { id: string }}>) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-600">
            <div className="bg-white/90 shadow-2xl rounded-2xl p-10 w-full max-w-md flex flex-col items-center">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-2 tracking-tight">Profile</h1>
                <p className="text-center text-gray-500 mb-8 text-2xl">Profile page</p>
                <span className="px-6 py-3 rounded-lg bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold text-lg shadow-md">
                    {params.id}
                </span>
            </div>
        </div>
    )
}