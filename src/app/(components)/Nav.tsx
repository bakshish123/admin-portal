'use client'; // Add this to indicate it's a client component

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Use next/navigation instead of next/router
import React from 'react';

const Navbar: React.FC = () => {
  const pathname = usePathname(); // Replace useRouter with usePathname

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Search', path: '/Search' },
    { name: 'create Alumni', path: '/createAlumni' },
    { name: 'Directory', path: '/directory' },
    { name: 'Forums', path: '/forums' },
    { name: 'Messaging', path: '/messaging' },
    { name: 'Announcements', path: '/announcements' },
    { name: 'Admin', path: '/admin' }, // Admin only access
  ];

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/">Alumni Portal</Link>
        </div>
        
        {/* Navigation Links */}
        <div className="flex space-x-4">
          {navItems.map((item, index) => (
            <Link key={index} href={item.path} className={`px-3 py-2 rounded-md text-sm font-medium ${
              pathname === item.path ? 'bg-gray-900' : 'hover:bg-gray-700'
            }`}>
              {item.name}
            </Link>
          ))}
        </div>

        {/* Authentication Links (could be conditional based on user state) */}
        <div>
          <Link href="/login" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
            Login
          </Link>
          <Link href="/signup" className="ml-4 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
