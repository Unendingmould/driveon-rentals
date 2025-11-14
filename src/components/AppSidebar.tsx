import { Link, useLocation } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { LogOut } from "lucide-react";
import type { Session } from "@supabase/supabase-js";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SidebarLink = {
  href: string;
  label: string;
  icon: LucideIcon;
  children?: SidebarLink[];
};

interface AppSidebarProps {
  links: SidebarLink[];
  session: Session | null;
  loading?: boolean;
  onSignOut?: () => Promise<void> | void;
}

export function AppSidebar({ links, session, loading, onSignOut }: AppSidebarProps) {
  const location = useLocation();

  if (!session) {
    return null;
  }

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="hidden md:flex">
      <aside className="fixed left-4 top-1/2 z-50 flex h-[50vh] w-12 -translate-y-1/2 flex-col items-center justify-center gap-8 rounded-3xl border border-[#e2d9cc]/80 bg-[#f7f3eb] py-5 shadow-xl">
        <nav className="flex flex-col items-center gap-4">
          {links.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);

            return (
              <Link key={link.href} to={link.href} className="group relative flex items-center justify-center">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-2xl transition-all",
                    active
                      ? "bg-[#1f1c1a] text-white shadow-lg"
                      : "bg-[#e6dfd4] text-[#8b8178] hover:bg-[#dad1c3] hover:text-[#5c534c]"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span
                  className="pointer-events-none absolute left-14 top-1/2 -translate-y-1/2 -translate-x-2 scale-90 rounded-2xl bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#1f1c1a] opacity-0 shadow-md transition-all duration-200 group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100 whitespace-nowrap"
                >
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-col items-center gap-4">
          <Button
            variant="ghost"
            className="group relative flex h-10 w-10 items-center justify-center rounded-2xl bg-[#e6dfd4] text-[#8b8178] transition-all hover:bg-[#dad1c3] hover:text-[#5c534c]"
            onClick={onSignOut}
            disabled={loading}
          >
            <LogOut className="h-5 w-5" />
            <span className="pointer-events-none absolute left-14 top-1/2 -translate-y-1/2 -translate-x-2 scale-90 rounded-2xl bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#1f1c1a] opacity-0 shadow-md transition-all duration-200 group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100 whitespace-nowrap">
              Sign out
            </span>
          </Button>
        </div>
      </aside>
    </div>
  );
}

export type { SidebarLink };
