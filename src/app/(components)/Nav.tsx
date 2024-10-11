// components/Navbar.tsx
"use client"; // Keep this to denote it's a client component
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import { Session } from "next-auth"; // Import the Session interface

interface NavbarProps {
  session: Session | null; // Update type to Session or null
}

const Navbar: React.FC<NavbarProps> = ({ session }) => {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Create Alumni", path: "/createAlumni" },
    { name: "Directory", path: "/directory" },
    { name: "Forums", path: "/forums" },
    { name: "Messaging", path: "/messaging" },
    { name: "Announcements", path: "/announcements" },
    { name: "Admin", path: "/admin" }, // Admin only access
  ];

  return (
    <nav className="bg-[rgb(0,60,106)] text-white p-4 shadow-md opacity-100">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-2xl font-bold text-lilac-400">
          <Link href="/">Alumni Portal</Link>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                pathname === item.path ? "bg-lilac-500 text-purple-400" : "hover:bg-gray-700 hover:text-lilac-400"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Authentication Links */}
        <div>
          {session ? (
            <Link
              href="/api/auth/signout?callbackUrl=/"
              className="px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-lilac-400 transition-colors duration-300"
            >
              Logout
            </Link>
          ) : (
            <div className="flex space-x-4">
              <Link
                href="/api/auth/signin"
                className="px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-lilac-400 transition-colors duration-300"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-lilac-400 transition-colors duration-300"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
