"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, BookOpen, FolderOpen } from "lucide-react";

const ADMIN_LINKS = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/blogs", label: "Blogs", icon: BookOpen },
    { href: "/admin/categories", label: "Categories", icon: FolderOpen },
];

export default function Sidebar() {
    const pathname = usePathname();

    const isActive = (href: string) =>
        href === "/admin" ? pathname === href : pathname?.startsWith(href);

    return (
        <>
            {/* Sidebar */}
            <aside
                className={`
                fixed md:static
                top-0 left-0
                h-screen w-64
                bg-white dark:bg-gray-900
                border-r border-gray-200 dark:border-gray-800
                z-40 overflow-y-auto`}
            >
                <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                    <Link href="/admin" className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center font-bold text-sm">
                            A
                        </div>
                        <span className="font-semibold text-gray-900 dark:text-white">
                            Admin Panel
                        </span>
                    </Link>
                </div>

                <nav className="p-2 space-y-1">
                    {ADMIN_LINKS.map((link) => {
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                    isActive(link.href)
                                        ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                }`}
                            >
                                <Icon size={18} />
                                <span>{link.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}
