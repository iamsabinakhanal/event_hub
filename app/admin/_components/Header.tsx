"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/action/auth_action";
import { useEffect, useState } from "react";
import { LogOut, User } from "lucide-react";

export default function Header() {
    const router = useRouter();
    const [userEmail, setUserEmail] = useState<string>("Admin");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Get user data from cookies/session
        const getUserData = async () => {
            try {
                const response = await fetch("/api/user", {
                    method: "GET",
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserEmail(data.email || "Admin");
                }
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        };
        getUserData();
    }, []);

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logoutUser();
            // Clear localStorage
            localStorage.removeItem("user_data");
            router.push("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-black/10 dark:border-white/10">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Global">
                <div className="flex h-16 items-center justify-between">
                    {/* Left: Logo & Title */}
                    <div className="flex items-center gap-3">
                        <Link href="/admin" className="flex items-center gap-2 group">
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-foreground text-background font-semibold">
                                A
                            </span>
                            <span className="text-base font-semibold tracking-tight group-hover:opacity-80 transition-opacity">
                                Admin Panel
                            </span>
                        </Link>
                    </div>

                    {/* Right: User & Logout */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm">
                            <User size={16} />
                            <span className="font-medium">{userEmail}</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            disabled={loading}
                            className="flex items-center gap-2 px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <LogOut size={16} />
                            <span>{loading ? "Logging out..." : "Logout"}</span>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}
