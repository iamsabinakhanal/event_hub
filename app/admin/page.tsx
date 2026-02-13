"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllUsers } from "@/lib/action/admin_action";
import Link from "next/link";
import { Users, Plus, Edit2, BarChart3, Shield } from "lucide-react";

export default function AdminDashboard() {
    const router = useRouter();
    const [stats, setStats] = useState({
        totalUsers: 0,
        adminUsers: 0,
        regularUsers: 0,
    });
    const [loading, setLoading] = useState(true);
    const [recentUsers, setRecentUsers] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await getAllUsers();
            if (result.success) {
                const users = result.data || [];
                
                // Calculate statistics
                const totalUsers = users.length;
                const adminUsers = users.filter((user: any) => user.role === "admin").length;
                const regularUsers = totalUsers - adminUsers;
                
                setStats({
                    totalUsers,
                    adminUsers,
                    regularUsers,
                });
                
                // Get recent users (last 5)
                setRecentUsers(users.slice(0, 5));
            } else {
                setError(result.message || "Failed to fetch dashboard data");
                console.error("Dashboard fetch error:", result.message);
            }
        } catch (error) {
            console.error("Failed to fetch dashboard data:", error);
            setError("An error occurred while fetching dashboard data");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Admin Dashboard
                </h1>
                <p className="text-slate-400">
                    Welcome back! Here's your event hub overview.
                </p>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-8 bg-red-900 border border-red-700 rounded-lg p-4 text-red-100">
                    <p className="font-medium">Error:</p>
                    <p className="text-sm mt-1">{error}</p>
                    <button
                        onClick={() => fetchDashboardData()}
                        className="mt-3 px-4 py-2 bg-red-700 hover:bg-red-600 rounded text-sm font-medium transition-colors"
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Total Users Card */}
                <div className="bg-linear-to-br from-blue-600 to-blue-800 rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-100 text-sm font-medium">Total Users</p>
                            <p className="text-4xl font-bold mt-2">{stats.totalUsers}</p>
                        </div>
                        <Users size={40} className="opacity-80" />
                    </div>
                </div>

                {/* Admin Users Card */}
                <div className="bg-linear-to-br from-purple-600 to-purple-800 rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-purple-100 text-sm font-medium">Admin Users</p>
                            <p className="text-4xl font-bold mt-2">{stats.adminUsers}</p>
                        </div>
                        <Shield size={40} className="opacity-80" />
                    </div>
                </div>

                {/* Regular Users Card */}
                <div className="bg-linear-to-br from-emerald-600 to-emerald-800 rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-emerald-100 text-sm font-medium">Regular Users</p>
                            <p className="text-4xl font-bold mt-2">{stats.regularUsers}</p>
                        </div>
                        <BarChart3 size={40} className="opacity-80" />
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Quick Actions Card */}
                <div className="bg-slate-800 rounded-lg p-6 shadow-lg border border-slate-700">
                    <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                    <div className="space-y-3">
                        <Link
                            href="/admin/users/create"
                            className="flex items-center gap-3 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                            <Plus size={20} />
                            <span>Create New User</span>
                        </Link>
                        <Link
                            href="/admin/users"
                            className="flex items-center gap-3 p-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                        >
                            <Users size={20} />
                            <span>Manage All Users</span>
                        </Link>
                    </div>
                </div>

                {/* System Info Card */}
                <div className="bg-slate-800 rounded-lg p-6 shadow-lg border border-slate-700">
                    <h2 className="text-xl font-bold text-white mb-4">System Info</h2>
                    <div className="space-y-2 text-sm text-slate-300">
                        <div className="flex justify-between">
                            <span>Status</span>
                            <span className="text-emerald-400 font-medium">Operational</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Last Updated</span>
                            <span>{new Date().toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>API Version</span>
                            <span>v1.0</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Users Table */}
            <div className="bg-slate-800 rounded-lg shadow-lg border border-slate-700 overflow-hidden">
                <div className="p-6 border-b border-slate-700">
                    <h2 className="text-xl font-bold text-white">Recent Users</h2>
                </div>
                
                {loading ? (
                    <div className="p-6 text-center text-slate-400">
                        Loading...
                    </div>
                ) : recentUsers.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-700 text-slate-200 text-sm">
                                    <th className="px-6 py-3 text-left">Name</th>
                                    <th className="px-6 py-3 text-left">Email</th>
                                    <th className="px-6 py-3 text-left">Role</th>
                                    <th className="px-6 py-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentUsers.map((user: any) => (
                                    <tr
                                        key={user._id}
                                        className="border-b border-slate-700 hover:bg-slate-700 transition-colors"
                                    >
                                        <td className="px-6 py-4 text-white">
                                            {user.firstName} {user.lastName}
                                        </td>
                                        <td className="px-6 py-4 text-slate-300">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                                    user.role === "admin"
                                                        ? "bg-purple-100 text-purple-800"
                                                        : "bg-blue-100 text-blue-800"
                                                }`}
                                            >
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link
                                                href={`/admin/users/${user._id}/edit`}
                                                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                                            >
                                                Edit
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-6 text-center text-slate-400">
                        No users found
                    </div>
                )}

                {recentUsers.length > 0 && (
                    <div className="p-6 border-t border-slate-700">
                        <Link
                            href="/admin/users"
                            className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                        >
                            View All Users →
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
