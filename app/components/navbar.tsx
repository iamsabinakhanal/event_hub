import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo - Left */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Event-HUB Logo"
            width={40}
            height={40}
            priority
          />
          <span className="text-xl font-bold text-gray-800">
            Event<span className="text-blue-600">HUB</span>
          </span>
        </Link>

        {/* Right side links (optional) */}
        <nav className="hidden md:flex gap-6">
          <Link href="/login" className="text-gray-600 hover:text-blue-600">
            Login
          </Link>
          <Link href="/register" className="text-gray-600 hover:text-blue-600">
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
}
