import Link from "next/link";
import { Sparkles, Phone, Mail, MapPin } from "lucide-react";

export default function PublicFooter() {
    return (
        <footer className="mt-12 bg-[#1f1c4d] text-white">
            <div className="mx-auto max-w-7xl px-6 py-14">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-fuchsia-600 p-2.5">
                                <Sparkles size={18} />
                            </div>
                            <h3 className="text-3xl font-bold">Event Hub</h3>
                        </div>
                        <p className="mt-5 max-w-xs text-2xl leading-relaxed text-white/65">
                            Creating unforgettable moments for your special celebrations. From weddings to parties, we make your dreams come true.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-4xl font-semibold">Quick Links</h4>
                        <ul className="mt-5 space-y-3 text-2xl text-white/65">
                            <li><Link href="/" className="transition hover:text-white">Home</Link></li>
                            <li><Link href="/services" className="transition hover:text-white">Services</Link></li>
                            <li><Link href="/gallery" className="transition hover:text-white">Gallery</Link></li>
                            <li><Link href="/contact" className="transition hover:text-white">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-4xl font-semibold">Services</h4>
                        <ul className="mt-5 space-y-3 text-2xl text-white/65">
                            <li>Wedding Planning</li>
                            <li>Birthday Parties</li>
                            <li>Anniversary Events</li>
                            <li>Engagement Ceremonies</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-4xl font-semibold">Contact Info</h4>
                        <ul className="mt-5 space-y-4 text-2xl text-white/65">
                            <li className="flex items-center gap-3">
                                <Phone size={20} className="text-fuchsia-400" />
                                +977 9822800399
                            </li>
                            <li className="flex items-center gap-3 break-all">
                                <Mail size={20} className="text-fuchsia-400" />
                                khanalsabina355@gmail.com
                            </li>
                            <li className="flex items-center gap-3">
                                <MapPin size={20} className="text-fuchsia-400" />
                                Nepal
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-14 border-t border-white/15 pt-7 text-center text-xl text-white/60">
                    © 2026 Event Hub. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
