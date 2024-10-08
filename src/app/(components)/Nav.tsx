// components/Navbar.tsx
"use client"; // Keep this to denote it's a client component
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

interface NavbarProps {
  session: any; // Replace 'any' with the appropriate type based on your session structure
}

const Navbar: React.FC<NavbarProps> = ({ session }) => {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Search", path: "/search" },
    { name: "Create Alumni", path: "/createAlumni" },
    { name: "Directory", path: "/directory" },
    { name: "Forums", path: "/forums" },
    { name: "Messaging", path: "/messaging" },
    { name: "Announcements", path: "/announcements" },
    { name: "Admin", path: "/admin" }, // Admin only access
  ];

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link href="/">Alumni Portal</Link>
        </div>
        <div className="flex space-x-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === item.path ? "bg-gray-900" : "hover:bg-gray-700"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div>
          {session ? (
            <Link
              href="/api/auth/signout?callbackUrl=/"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
            >
              Logout
            </Link>
          ) : (
            <div className="flex space-x-4">
              <Link
                href="/api/auth/signin"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
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
