"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CircleIcon, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigation = [
    { name: "Courses", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Admin", href: "/admin" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <div className="flex items-center gap-2 mr-4">
          <Link href="/" className="flex items-center gap-2">
            <CircleIcon className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-bold text-white">100Devs</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-blue-500",
                pathname === item.href ||
                  (item.href === "/admin" && pathname.startsWith("/admin"))
                  ? "text-blue-500"
                  : "text-gray-300",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 ml-auto">
          <Link
            href="/login"
            className="hidden md:block text-sm font-medium text-gray-300 hover:text-white"
          >
            Log in
          </Link>
          <Button
            asChild
            className="hidden md:inline-flex bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Link href="/signup">Sign Up - Free Education For All</Link>
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block py-2 text-base font-medium",
                  pathname === item.href ||
                    (item.href === "/admin" && pathname.startsWith("/admin"))
                    ? "text-blue-500"
                    : "text-gray-300",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 pb-3 border-t border-gray-800">
              <Link
                href="/login"
                className="block py-2 text-base font-medium text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="block py-2 text-base font-medium text-blue-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up - Free Education For All
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
