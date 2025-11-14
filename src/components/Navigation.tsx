import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  LogOut,
  LayoutDashboard,
  UserRound,
  Truck as TruckIcon,
  Home,
  Info,
  DollarSign,
  Phone,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useToast } from "@/hooks/use-toast";
import { signOut } from "@/services/auth";
import logo from "@/assets/truckonflex.svg";
import logoWhite from "@/assets/truckonflex-white.svg";
import { AppSidebar } from "./AppSidebar";
import { DashboardSidebar } from "./DashboardSidebar";
import type { SidebarLink } from "./AppSidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Navigation() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isTransparent, setIsTransparent] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session, supabaseClient, isLoading: authLoading } = useSessionContext();

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("[Navigation] Mounted", {
        isMobile,
        pathname: location.pathname,
        hasSession: !!session,
      });
    }
  }, [isMobile, location.pathname, session]);

  const toggleMobileExpanded = (key: string) => {
    setMobileExpanded((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/trucks", label: "Our Trucks" },
    { href: "/financing", label: "Financing" },
  ];

  const landingSidebarLinks = useMemo<SidebarLink[]>(
    () => [
      { href: "/", label: "Home", icon: Home },
      { href: "/about", label: "About Us", icon: Info },
      { href: "/trucks", label: "Our Trucks", icon: TruckIcon },
      { href: "/financing", label: "Financing", icon: DollarSign },
      { href: "/contact", label: "Contact", icon: Phone },
    ],
    []
  );

  const authenticatedSidebarLinks = useMemo<SidebarLink[]>(
    () => [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { 
        href: "/trucks-menu", 
        label: "Trucks", 
        icon: TruckIcon,
        children: [
          { href: "/trucks", label: "Buy/Rent Truck", icon: TruckIcon },
          { href: "/my-trucks", label: "My Trucks", icon: TruckIcon },
        ]
      },
      { href: "/profile", label: "Profile", icon: UserRound },
    ],
    []
  );

  const sidebarLinks = session ? authenticatedSidebarLinks : landingSidebarLinks;

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  useEffect(() => {
    const transparentHeaderRoutes = ['/']; // Add other routes with hero images here
    const isTransparentRoute = transparentHeaderRoutes.includes(location.pathname);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (isTransparentRoute) {
        setIsTransparent(currentScrollY <= 50);
      } else {
        setIsTransparent(false);
      }

      // Hide on scroll down, show on scroll up
      setLastScrollY(prevScrollY => {
        setIsVisible(currentScrollY < prevScrollY || currentScrollY < 10);
        return currentScrollY;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Set initial state
    if (isTransparentRoute) {
      setIsTransparent(window.scrollY <= 50);
    } else {
      setIsTransparent(false);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleSignOut = useCallback(async () => {
    await signOut(supabaseClient);
    toast({ title: "Signed out", description: "You have been signed out of TrucksOnFlex." });
    navigate("/");
  }, [navigate, supabaseClient, toast]);

  const userMetadata = session?.user.user_metadata ?? {};
  const displayName =
    (typeof userMetadata.full_name === "string" && userMetadata.full_name.trim()) ||
    [userMetadata.first_name, userMetadata.last_name]
      .filter((value): value is string => typeof value === "string" && value.trim().length > 0)
      .map((value) => value.trim())
      .join(" ") ||
    session?.user.email ||
    "Authenticated";

  const hideSidebarRoutes = ["/auth", "/", "/about", "/financing", "/financing/apply", "/contact"];
  const shouldShowDashboardSidebar = Boolean(session) && (
    location.pathname.startsWith("/dashboard") || 
    location.pathname.startsWith("/my-trucks") || 
    location.pathname.startsWith("/profile") ||
    location.pathname.startsWith("/trucks")
  );
  const shouldShowSidebar = Boolean(session) && !hideSidebarRoutes.includes(location.pathname) && !shouldShowDashboardSidebar;

  useEffect(() => {
    const className = "has-auth-sidebar";

    if (shouldShowSidebar) {
      document.body.classList.add(className);
    } else {
      document.body.classList.remove(className);
    }

    return () => {
      document.body.classList.remove(className);
    };
  }, [shouldShowSidebar]);

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          session ? "translate-y-0" : (isVisible ? "translate-y-0" : "-translate-y-full")
        } ${isTransparent ? "bg-transparent backdrop-blur-sm" : "bg-white border-b border-border"}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[3.87rem]">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img src={isTransparent ? logoWhite : logo} alt="TrucksOnFlex Logo" className="h-10 md:h-12 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {!session && (
                <>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`text-sm font-medium transition-colors ${
                        isTransparent
                          ? `hover:text-white ${isActive(link.href) ? "text-white" : "text-white/80"}`
                          : `hover:text-primary ${isActive(link.href) ? "text-black" : "text-black/80"}`
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    to="/contact"
                    className={`text-sm font-medium transition-colors ${
                      isTransparent
                        ? `hover:text-white ${isActive("/contact") ? "text-white" : "text-white/80"}`
                        : `hover:text-primary ${isActive("/contact") ? "text-black" : "text-black/80"}`
                    }`}
                  >
                    Contact
                  </Link>
                  {!authLoading && (
                    <Button className="rounded-full" asChild>
                      <Link to="/auth">Login / Sign up</Link>
                    </Button>
                  )}
                </>
              )}

              {!authLoading && session && !shouldShowDashboardSidebar && (
                <div className="flex items-center gap-3">
                  <Button
                    variant={isTransparent ? "secondary" : "default"}
                    className="rounded-full"
                    asChild
                  >
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
                  <Button
                    variant={isTransparent ? "outline" : "outline"}
                    className="rounded-full hover:bg-yellow-50 hover:text-primary hover:border-primary transition-colors min-h-11"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 rounded-2xl border border-yellow-400/40 bg-white/85 text-foreground shadow-[0_12px_32px_-12px_rgba(255,194,12,0.45)] backdrop-blur-md transition-colors hover:bg-yellow-50 min-h-11 min-w-11"
                    aria-label="Open navigation menu"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[18rem] max-w-[80vw] border-l border-yellow-300/40 bg-gradient-to-b from-white via-amber-50 to-yellow-50 p-0 shadow-[0_20px_60px_-15px_rgba(246,189,67,0.35)] sm:w-80"
                >
                  <div className="flex h-full flex-col">
                    <div className="border-b border-yellow-200/50 px-6 pb-6 pt-10">
                      {session ? (
                        <div className="space-y-1">
                          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-700/80">Workspace</p>
                          <p className="text-xl font-semibold text-foreground">{displayName}</p>
                          <span className="text-sm text-muted-foreground">Navigate your TrucksOnFlex tools</span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-lg font-semibold text-foreground">Menu</p>
                          <p className="text-sm text-muted-foreground">Explore TrucksOnFlex and get rolling faster.</p>
                        </div>
                      )}
                    </div>
                    <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
                      {sidebarLinks.map((link) => {
                        const Icon = link.icon;
                        const active = isActive(link.href);
                        const hasChildren = Array.isArray(link.children) && link.children.length > 0;
                        const expanded = mobileExpanded.includes(link.href);

                        if (hasChildren) {
                          return (
                            <div key={link.href} className="rounded-2xl">
                              <button
                                type="button"
                                onClick={() => toggleMobileExpanded(link.href)}
                                className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-base font-medium transition-colors ${
                                  expanded
                                    ? "bg-[#1f1c1a] text-white shadow-lg"
                                    : "bg-white/70 text-[#5c534c] backdrop-blur hover:bg-yellow-100/80 hover:text-[#1f1c1a]"
                                }`}
                              >
                                <span className="flex items-center gap-3">
                                  <Icon className="h-5 w-5" />
                                  {link.label}
                                </span>
                                {expanded ? (
                                  <ChevronDown className="h-5 w-5" />
                                ) : (
                                  <ChevronRight className="h-5 w-5" />
                                )}
                              </button>
                              {expanded && (
                                <div className="mt-1 space-y-2 pl-4">
                                  {link.children!.map((child) => (
                                    <Link
                                      key={child.href}
                                      to={child.href}
                                      onClick={() => setIsOpen(false)}
                                      className={`flex items-center gap-3 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                                        isActive(child.href)
                                          ? "bg-[#1f1c1a] text-white shadow-lg"
                                          : "bg-white/70 text-[#5c534c] backdrop-blur hover:bg-yellow-100/80 hover:text-[#1f1c1a]"
                                      }`}
                                    >
                                      <child.icon className="h-4 w-4" />
                                      <span>{child.label}</span>
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        }

                        return (
                          <Link
                            key={link.href}
                            to={link.href}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-medium transition-colors ${
                              active
                                ? "bg-[#1f1c1a] text-white shadow-lg"
                                : "bg-white/70 text-[#5c534c] backdrop-blur hover:bg-yellow-100/80 hover:text-[#1f1c1a]"
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                            <span>{link.label}</span>
                          </Link>
                        );
                      })}
                    </nav>
                    <div className="space-y-3 border-t border-yellow-200/60 px-6 pb-10 pt-6">
                      {!authLoading && (
                        session ? (
                          <Button
                            onClick={() => {
                              setIsOpen(false);
                              handleSignOut();
                            }}
                            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1f1c1a] py-3 text-white shadow-lg hover:bg-[#2a2623]"
                          >
                            <LogOut className="h-4 w-4" />
                            Sign out
                          </Button>
                        ) : (
                          <>
                            <Button
                              asChild
                              className="w-full justify-center rounded-full bg-[#1f1c1a] py-3 text-white shadow-lg hover:bg-[#2a2623]"
                            >
                              <Link to="/auth" onClick={() => setIsOpen(false)}>
                                Login / Sign up
                              </Link>
                            </Button>
                            <Button
                              variant="outline"
                              asChild
                              className="w-full justify-center rounded-full border-yellow-300 bg-white py-3 text-sm font-semibold text-[#5c534c] hover:bg-yellow-100/60"
                            >
                              <Link to="/contact" onClick={() => setIsOpen(false)}>
                                Talk to our team
                              </Link>
                            </Button>
                          </>
                        )
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
      {!isMobile && shouldShowDashboardSidebar && (
        <DashboardSidebar links={authenticatedSidebarLinks} session={session} loading={authLoading} onSignOut={handleSignOut} />
      )}
      {!isMobile && shouldShowSidebar && !shouldShowDashboardSidebar && (
        <AppSidebar links={sidebarLinks} session={session} loading={authLoading} onSignOut={handleSignOut} />
      )}
    </>
  );
}