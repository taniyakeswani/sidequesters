import { Button } from "@/components/ui/button";
import logoIcon from "@/assets/logo-icon.png";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto max-w-[1440px] px-6 lg:px-12">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <img 
              src={logoIcon} 
              alt="SideQuest Logo" 
              className="h-9 w-9 object-contain transition-transform group-hover:scale-105"
            />
            <span className="text-xl font-semibold text-foreground">
              SideQuest
            </span>
          </a>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <Button variant="hero" size="default" className="hidden sm:flex">
            View Our Work
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
