"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import type { Session } from "next-auth";
import classnames from "classnames";
import { ChevronDown, User, LogOut, LogIn } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const Navbar = () => {
  const currentPath = usePathname();
  const { data: session, status } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSignOut = () => {
    signOut();
    setIsDropdownOpen(false);
  };

  const handleSignIn = () => {
    signIn("google");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between w-full">
        {/* Left side - Navigation links at absolute left */}
        <div className="flex items-center space-x-6">
          <NavigationLinks currentPath={currentPath} />
        </div>

        {/* Right side - User authentication at absolute right */}
        <div className="flex items-center">
          <UserMenu
            session={session}
            status={status}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            handleSignIn={handleSignIn}
            handleSignOut={handleSignOut}
          />
        </div>
      </div>
    </nav>
  );
};

const NAV_LINKS = [
  { label: "Dashboard", href: "/" },
  { label: "Issues", href: "/issues" },
];

function NavigationLinks({ currentPath }: { currentPath: string }) {
  return (
    <ul className="flex space-x-6">
      {NAV_LINKS.map((link) => (
        <li key={link.href}>
          <Link
            className={classnames(
              "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
              {
                "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20":
                  link.href === currentPath,
                "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800":
                  link.href !== currentPath,
              }
            )}
            href={link.href}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function UserMenu({
  session,
  status,
  isDropdownOpen,
  setIsDropdownOpen,
  handleSignIn,
  handleSignOut,
}: {
  session: Session | null;
  status: "loading" | "authenticated" | "unauthenticated";
  isDropdownOpen: boolean;
  setIsDropdownOpen: (open: boolean) => void;
  handleSignIn: () => void;
  handleSignOut: () => void;
}) {
  if (status === "loading") {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
        <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
    );
  }
  if (session?.user) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
          <div className="flex items-center space-x-2">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || "User"}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full border-2 border-gray-200 dark:border-gray-700"
              />
            ) : (
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </div>
            )}
            <span className="hidden sm:block">
              {session.user.name || session.user.email}
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown menu */}
        {isDropdownOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsDropdownOpen(false)}
            />
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-20">
              <div className="py-1">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {session.user.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {session.user.email}
                  </p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
  return (
    <button
      onClick={handleSignIn}
      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors duration-200">
      <LogIn className="w-4 h-4" />
      <span>Sign in</span>
    </button>
  );
}

export default Navbar;
