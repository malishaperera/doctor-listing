"use client"
import Link from 'next/link';

export default function Header() {
    return (
        <header className="bg-white shadow-md my-header">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-blue-600">
                    Apollo Clone
                </Link>

                <nav className="flex gap-6">
                    <span className="text-gray-600">Doctors</span>
                    <span className="text-gray-600">Consultation</span>
                    <span className="text-gray-600">Health Package</span>
                </nav>
            </div>
        </header>
    );
}