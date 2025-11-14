import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { LogOut, ChevronDown, ChevronRight } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SidebarLink = {
  href: string;
  label: string;
  icon: LucideIcon;
  children?: SidebarLink[];
};

interface DashboardSidebarProps {
  links: SidebarLink[];
  session: Session | null;
  loading?: boolean;
  onSignOut?: () => Promise<void> | void;
}

export function DashboardSidebar({ links, session, loading, onSignOut }: DashboardSidebarProps) {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(["/trucks-menu"]);

  if (!session) {
    return null;
  }

  const userMetadata = session?.user.user_metadata ?? {};
  const displayName =
    (typeof userMetadata.full_name === "string" && userMetadata.full_name.trim()) ||
    [userMetadata.first_name, userMetadata.last_name]
      .filter((value): value is string => typeof value === "string" && value.trim().length > 0)
      .map((value) => value.trim())
      .join(" ") ||
    session?.user.email?.split("@")[0] ||
    "User";

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    if (href === "/trucks-menu") {
      return location.pathname === "/trucks" || location.pathname === "/my-trucks";
    }
    if (href === "/trucks") {
      return location.pathname === "/trucks";
    }
    if (href === "/my-trucks") {
      return location.pathname === "/my-trucks";
    }
    return location.pathname.startsWith(href);
  };

  const toggleExpanded = (key: string) => {
    setExpandedItems(prev =>
      prev.includes(key) ? prev.filter(item => item !== key) : [...prev, key]
    );
  };

  return (
    <aside className="hidden md:flex fixed left-0 top-[3.87rem] z-30 h-[calc(100vh-3.87rem)] w-64 border-r border-border bg-white flex-col">
      {/* User Info */}
      <div className="border-b border-border px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-foreground">{displayName}</p>
            <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation - flex-1 to take remaining space */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.href);
          const hasChildren = link.children && link.children.length > 0;
          const isExpanded = expandedItems.includes(link.href);

          if (hasChildren) {
            return (
              <div key={link.href}>
                <button
                  onClick={() => toggleExpanded(link.href)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    "text-foreground hover:bg-muted",
                    active && "bg-muted"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    <span>{link.label}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                {isExpanded && (
                  <div className="ml-4 mt-1 space-y-1 border-l border-border pl-4">
                    {link.children.map((child) => {
                      const ChildIcon = child.icon;
                      const childActive = isActive(child.href);
                      return (
                        <Link
                          key={child.href}
                          to={child.href}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                            childActive
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          <ChildIcon className="h-4 w-4" />
                          <span>{child.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sign Out Button - Footer */}
      <div className="border-t border-border p-4 mt-auto">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:bg-muted hover:text-foreground"
          onClick={onSignOut}
          disabled={loading}
        >
          <LogOut className="mr-3 h-4 w-4" />
          Sign out
        </Button>
      </div>
    </aside>
  );
}

export type { SidebarLink };
