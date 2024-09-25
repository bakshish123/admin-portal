"use client"
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import React from 'react';

const Navbar: React.FC = async () => {
  const pathname = usePathname();
  const session = await getServerSession(options);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Search', path: '/Search' },
    { name: 'Create Alumni', path: '/createAlumni' },
    { name: 'Directory', path: '/directory' },
    { name: 'Forums', path: '/forums' },
    { name: 'Messaging', path: '/messaging' },
    { name: 'Announcements', path: '/announcements' },
    { name: 'Admin', path: '/admin' }, // Admin only access
  ];

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link href="/">Alumni Portal</Link>
        </div>
        <div className="flex space-x-4">
          {navItems.map((item, index) => (
            <Link key={index} href={item.path} className={`px-3 py-2 rounded-md text-sm font-medium ${
              pathname === item.path ? 'bg-gray-900' : 'hover:bg-gray-700'
            }`}>
              {item.name}
            </Link>
          ))}
        </div>
        <div>
          {session ? (
            <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
          ) : (
            <Link href="/api/auth/signin">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
