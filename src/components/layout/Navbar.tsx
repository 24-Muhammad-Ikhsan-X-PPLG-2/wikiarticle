"use client";
import { NavLink } from "@/types/nav-links";
import { BookOpen, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

const navLinks: NavLink[] = [
  {
    display: "Home",
    url: "/",
  },
  {
    display: "Explore",
    url: "/explore",
  },
  {
    display: "About",
    url: "/about",
  },
];

type Props = {
  currentPage?: string;
  isUserLoggedIn?: boolean;
  handleLogout?: () => void;
};

const Navbar: FC<Props> = ({
  currentPage = "Home",
  isUserLoggedIn = false,
  handleLogout = () => {},
}) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
              <BookOpen className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              WikiArticle
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item, idx) => (
              <Link
                key={idx}
                href={item.url}
                className={`hover:text-gray-900 dark:hover:text-white transition-colors duration-200 font-medium ${item.display.toLowerCase() == currentPage.toLowerCase() ? "text-blue-600 dark:text-blue-400 font-bold" : "text-gray-600 dark:text-gray-300"}`}
              >
                {item.display}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="md:flex hidden items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 cursor-pointer"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-amber-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* Auth Buttons */}
            {!isUserLoggedIn ? (
              <div className="md:flex hidden gap-4">
                <Link href="/login">
                  <button className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white font-medium transition-colors duration-200 cursor-pointer">
                    Log In
                  </button>
                </Link>
                <button className="px-6 py-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer">
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="md:flex hidden">
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white font-medium transition-colors duration-200 cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
