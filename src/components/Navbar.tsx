'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
         <Image
            src="/logo.png"
            alt="Avon Resumes"
            width={120}
            height={40}
            className="h-16 w-auto mr-3"
            />
        </Link>
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/" className="text-gray-700 hover:text-gray-900">Home</Link>
          <Link href="/services" className="text-gray-700 hover:text-gray-900">Resume Services</Link>
          <Link href="/premium" className="text-gray-700 hover:text-gray-900">Premium</Link>
          <Link href="/usa-canada" className="text-gray-700 hover:text-gray-900">USA-Canada</Link>
          <Link href="/samples" className="text-gray-700 hover:text-gray-900">Infographic</Link>
          <Link href="/testimonials" className="text-gray-700 hover:text-gray-900">Testimonials</Link>
          <Link href="/blogs" className="text-gray-700 hover:text-gray-900">Blogs</Link>
          <Link
            href="/contact"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-4 py-2 rounded transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
}
