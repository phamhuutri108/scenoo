"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AppSidebarProps {
  defaultExpanded?: boolean;
  persistKey?: string;
}

const NAV_ITEMS = [
  { icon: "folder_open", label: "Projects", href: "/projects" },
  { icon: "video_library", label: "Assets", href: "/assets" },
  { icon: "groups", label: "Crew", href: "/crew" },
  { icon: "delete", label: "Archive", href: "/archive" },
  { icon: "settings", label: "Settings", href: "/settings" },
];

export default function AppSidebar({ defaultExpanded = true, persistKey }: AppSidebarProps) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [enableTransition, setEnableTransition] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    if (persistKey) {
      const stored = localStorage.getItem(persistKey);
      if (stored !== null) {
        setIsExpanded(stored === "true");
      } else {
        setIsExpanded(defaultExpanded);
      }
    } else {
      setIsExpanded(defaultExpanded);
    }
    const timer = setTimeout(() => {
      setEnableTransition(true);
    }, 50);
    return () => clearTimeout(timer);
  }, [persistKey, defaultExpanded]);

  const toggleSidebar = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    if (persistKey) {
      localStorage.setItem(persistKey, String(newState));
    }
  };

  const isActive = (href: string) => {
    if (href === "/projects" && pathname.startsWith("/projects")) return true;
    if (href === "/crew" && pathname.startsWith("/crew")) return true;
    if (href === "/settings" && pathname.startsWith("/settings")) return true;
    return pathname === href;
  };

  return (
    <aside
      className={`shrink-0 h-screen flex flex-col p-4 bg-surface-container-lowest border-r border-outline-variant z-40 relative ${
        enableTransition ? "transition-all duration-300" : ""
      } ${isExpanded ? "w-64" : "w-20"}`}
    >
      {/* Header */}
      <div
        className={`mb-8 flex items-center ${
          isExpanded ? "justify-between px-2" : "justify-center"
        }`}
      >
        {isExpanded && (
          <div className="overflow-hidden whitespace-nowrap flex items-center">
            <Image
              src="/scenoo-full-light-logo.png"
              alt="Scenoo Production Hub"
              width={175}
              height={48}
              className="w-auto h-18 block dark:hidden"
              priority
            />
            <Image
              src="/scenoo-full-dark-logo.png"
              alt="Scenoo Production Hub"
              width={175}
              height={48}
              className="w-auto h-18 hidden dark:block"
              priority
            />
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-lg transition-colors shrink-0"
          aria-label="Toggle sidebar"
        >
          <span className="material-symbols-outlined text-[20px]">
            {isExpanded ? "chevron_left" : "menu"}
          </span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 flex-1 overflow-y-auto hide-scrollbar">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center p-3 rounded-lg transition-colors ${
                isExpanded ? "justify-start gap-3" : "justify-center"
              } ${
                active
                  ? "bg-surface-container text-on-surface font-medium"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
              }`}
              title={!isExpanded ? item.label : undefined}
            >
              <span
                className="material-symbols-outlined text-[24px]"
                style={{ fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              {isExpanded && <span className="text-label-md whitespace-nowrap">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User Profile Block with Dropdown */}
      <div className="mt-auto pt-4 border-t border-outline-variant relative">

        {isUserMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsUserMenuOpen(false)}
            />
            <div
              className={`absolute bottom-full mb-2 bg-surface-container-lowest border border-outline-variant rounded-lg shadow-lg z-50 py-1 flex flex-col overflow-hidden min-w-[160px] ${
                isExpanded ? "left-0 w-full" : "left-0"
              }`}
            >
              <Link
                href="/settings/my-profile"
                onClick={() => setIsUserMenuOpen(false)}
                className="px-4 py-2 text-left text-label-md text-on-surface hover:bg-surface-container transition-colors flex items-center gap-3"
              >
                <span className="material-symbols-outlined text-[18px]">settings</span>
                Settings
              </Link>
              <button
                onClick={() => setIsUserMenuOpen(false)}
                className="px-4 py-2 text-left text-label-md text-error hover:bg-error-container transition-colors flex items-center gap-3 w-full"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
                Logout
              </button>
            </div>
          </>
        )}

        <button
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className={`w-full flex items-center p-2 rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer text-left ${
            isExpanded ? "gap-3 justify-start" : "justify-center"
          } ${isUserMenuOpen ? "bg-surface-container-low" : ""}`}
          title={!isExpanded ? "Tri Pham - Director" : undefined}
        >
          <div className="w-8 h-8 rounded-full bg-brand-amber flex items-center justify-center text-white text-label-sm font-medium shrink-0 shadow-sm">
            TP
          </div>
          {isExpanded && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-label-md text-on-surface truncate">Tri Pham</span>
              <span className="text-label-sm text-on-surface-variant truncate">Director</span>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}
