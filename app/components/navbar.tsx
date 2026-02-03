import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Galley", href: "#galley" },
  { label: "Contact", href: "#contact" },
];

const profileImage =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop offset='0%' stop-color='#60a5fa'/><stop offset='100%' stop-color='#a78bfa'/></linearGradient></defs><rect width='120' height='120' rx='60' fill='url(#g)'/><text x='50%' y='54%' text-anchor='middle' fill='white' font-size='44' font-family='Arial' font-weight='700'>EH</text></svg>"
  );

export default function Navbar() {
  return (
    <header className="w-full bg-white/90 backdrop-blur border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
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

        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/user/profile"
            className="flex items-center gap-3 rounded-full border border-gray-200 bg-white pl-2 pr-4 py-1.5 shadow-sm hover:shadow transition"
          >
            <img
              src={profileImage}
              alt="Profile"
              className="h-9 w-9 rounded-full object-cover"
            />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-xs text-gray-500">Welcome back</span>
              <span className="text-sm font-semibold text-gray-800">Event Manager</span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}