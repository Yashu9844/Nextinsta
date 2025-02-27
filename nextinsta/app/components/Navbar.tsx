"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { FaHome, FaCompass, FaRegPaperPlane, FaRegHeart, FaRegUser, FaSearch } from 'react-icons/fa';

const Navbar = () => {
const { data: session } = useSession();
const [searchQuery, setSearchQuery] = useState('');

return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-10">
    <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                NextInsta
            </h1>
            </Link>
        </div>

        {/* Search Bar - hidden on mobile */}
        <div className="hidden md:block flex-1 max-w-md mx-4">
            <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
            </div>
            <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-100 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            </div>
        </div>

        {/* Navigation Icons */}
        <div className="flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-black">
            <FaHome size={22} />
            </Link>
            <Link href="/explore" className="text-gray-700 hover:text-black">
            <FaCompass size={22} />
            </Link>
            <Link href="/messages" className="text-gray-700 hover:text-black">
            <FaRegPaperPlane size={22} />
            </Link>
            <Link href="/notifications" className="text-gray-700 hover:text-black">
            <FaRegHeart size={22} />
            </Link>
            <Link 
            href={`/${session?.user?.name || 'profile'}`} 
            className="text-gray-700 hover:text-black"
            >
            {session?.user?.image ? (
                <Image 
                src={session.user.image} 
                alt="Profile" 
                width={24} 
                height={24} 
                className="rounded-full"
                />
            ) : (
                <FaRegUser size={22} />
            )}
            </Link>
        </div>
        </div>

        {/* Mobile Search - visible only on mobile */}
        <div className="md:hidden pb-3">
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
            </div>
            <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-100 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
        </div>
    </div>
    </nav>
);
};

export default Navbar;

