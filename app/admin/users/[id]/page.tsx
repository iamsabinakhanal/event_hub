"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getUserById } from "@/lib/action/admin_action";
import Link from "next/link";

export default function UserDetailPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;
    
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (id) {
            fetchUser();
        }
    }, [id]);

    const fetchUser = async () => {
        setLoading(true);
        try {
            const result = await getUserById(id);
            if (result.success) {
                setUser(result.data);
            } else {
                setMessage(result.message || "Failed to fetch user");
            }
        } catch (error) {
            setMessage("An error occurred while fetching user");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading user details...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{message || "User not found"}</p>
                    <Link href="/admin/users" className="text-blue-600 hover:underline">
                        Back to Users
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-8 bg-gray-50">
            <div className="max-w-3xl mx-auto">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">User Details</h1>
                    <div className="space-x-2">
                        <Link
                            href={`/admin/users/${id}/edit`}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 inline-block"
                        >
                            Edit User
                        </Link>
                        <Link
                            href="/admin/users"
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-200 inline-block"
                        >
                            Back to List
                        </Link>
                    </div>
                </div>

                {message && (
                    <div className="mb-4 p-3 rounded bg-red-100 text-red-700">
                        {message}
                    </div>
                )}

                <div className="bg-white rounded-lg shadow-md p-8">
                    {/* User Image */}
                    <div className="mb-8 text-center">
                        {user.image ? (
                            <img
                                src={`http://localhost:5000/${user.image}`}
                                alt={user.firstName}
                                className="w-32 h-32 rounded-full object-cover mx-auto"
                            />
                        ) : (
                            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mx-auto">
                                <span className="text-gray-500 text-4xl font-medium">
                                    {user.firstName?.[0] || "U"}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* User Information */}
                    <div className="space-y-6">
                        <div className="border-b pb-4">
                            <h2 className="text-xl font-semibold mb-4">User ID: {id}</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    First Name
                                </label>
                                <p className="text-lg text-gray-900">{user.firstName || "N/A"}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    Last Name
                                </label>
                                <p className="text-lg text-gray-900">{user.lastName || "N/A"}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    Email
                                </label>
                                <p className="text-lg text-gray-900">{user.email}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    Role
                                </label>
                                <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                                    user.role === "admin" 
                                        ? "bg-purple-100 text-purple-800" 
                                        : "bg-green-100 text-green-800"
                                }`}>
                                    {user.role}
                                </span>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    Created At
                                </label>
                                <p className="text-lg text-gray-900">
                                    {new Date(user.createdAt).toLocaleString()}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    Updated At
                                </label>
                                <p className="text-lg text-gray-900">
                                    {new Date(user.updatedAt).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
