"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname.includes(path);

  return (
    <aside className="w-64 bg-surface-container-lowest border-r border-outline-variant flex flex-col py-8 px-4 shrink-0 overflow-y-auto">
      <div className="mb-8">
        <h3 className="text-label-sm font-bold text-outline uppercase tracking-wider mb-3 px-4">Profile Settings</h3>
        <nav className="flex flex-col gap-1">
          <Link
            href="/settings/my-profile"
            className={`w-full text-left px-4 py-2 rounded-lg text-body-md transition-colors ${isActive("/my-profile") ? "bg-surface-container text-on-surface font-medium" : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"}`}
          >
            My Profile
          </Link>
          <Link
            href="/settings/change-password"
            className={`w-full text-left px-4 py-2 rounded-lg text-body-md transition-colors ${isActive("/change-password") ? "bg-surface-container text-on-surface font-medium" : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"}`}
          >
            Change Password
          </Link>
        </nav>
      </div>

      <div>
        <h3 className="text-label-sm font-bold text-outline uppercase tracking-wider mb-3 px-4">Subscription</h3>
        <nav className="flex flex-col gap-1">
          <Link
            href="/settings/plans"
            className={`w-full text-left px-4 py-2 rounded-lg text-body-md transition-colors ${isActive("/plans") ? "bg-surface-container text-on-surface font-medium" : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"}`}
          >
            Plans & Pricing
          </Link>
          <Link
            href="/settings/billing"
            className={`w-full text-left px-4 py-2 rounded-lg text-body-md transition-colors ${isActive("/billing") ? "bg-surface-container text-on-surface font-medium" : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"}`}
          >
            Billing
          </Link>
        </nav>
      </div>
    </aside>
  );
}
