import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function MinimalNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/trucks", label: "Our solutions" },
    { href: "/about", label: "About" },
    { href: "/financing", label: "Financing" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-light tracking-wide text-neutral-900">
            TruckRental
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                to={href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(href)
                    ? "text-neutral-900"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Link to="/order">
              <Button className="btn-minimal">
                Get started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-6 mt-8">
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    to={href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-light transition-colors duration-200 ${
                      isActive(href)
                        ? "text-neutral-900"
                        : "text-neutral-600 hover:text-neutral-900"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
                <div className="pt-4">
                  <Link to="/order" onClick={() => setIsOpen(false)}>
                    <Button className="btn-minimal w-full">
                      Get started
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}