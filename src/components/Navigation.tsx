import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Truck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/truckonflex.svg";
import logoWhite from "@/assets/truckonflex-white.svg";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isTransparent, setIsTransparent] = useState(true);
  const location = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/trucks", label: "Our Trucks" },
    { href: "/financing", label: "Financing" },
  ];

  const isActive = (href: string) => {
    return location.pathname === href;
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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    } ${
      isTransparent ? 'bg-transparent backdrop-blur-sm' : 'bg-white shadow-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={isTransparent ? logoWhite : logo} alt="DriveOn Logo" className="h-24 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors ${
                  isTransparent
                    ? `hover:text-white ${isActive(link.href) ? 'text-white' : 'text-white/80'}`
                    : `hover:text-primary ${isActive(link.href) ? 'text-black' : 'text-black/80'}`
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button className={`px-6 py-2 rounded-full font-medium transition-colors ${isTransparent ? 'bg-black text-white hover:bg-black/90' : 'bg-primary text-white hover:bg-primary/90'}`}>
              Contact
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-6 mt-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-medium transition-colors hover:text-primary ${
                        isActive(link.href) 
                          ? "text-primary" 
                          : "text-muted-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Button className="btn-cta w-full mt-4 rounded-full">
                    Get Started
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}