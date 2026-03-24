"use client";

import { FC, useEffect, useState } from "react";
import TableOfContentsItem from "../types/TableOfContentsItem";

type Props = {
  items: TableOfContentsItem[];
};

const TableOfContents: FC<Props> = ({ items }) => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const headings = items.map((item) => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      const active = headings.find((h) => {
        if (!h.element) return false;
        const rect = h.element.getBoundingClientRect();
        return rect.top > 0 && rect.top < window.innerHeight / 2;
      });

      if (active) {
        setActiveId(active.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    const navbarHeight = 80;
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;
      window.scrollTo({ behavior: "smooth", top: offsetPosition });
    }
  };

  if (items.length === 0) return null;

  return (
    <nav className="hidden lg:block fixed left-8 top-32 w-56 max-h-[calc(100vh-200px)] overflow-y-auto">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
          Contents
        </h3>

        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
            >
              <button
                onClick={() => handleClick(item.id)}
                className={`text-sm transition-all duration-200 hover:text-blue-600 dark:hover:text-blue-400 truncate text-left w-full ${
                  activeId === item.id
                    ? "text-blue-600 dark:text-blue-400 font-semibold"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default TableOfContents;
