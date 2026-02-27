import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import logoIcon from "@/assets/sidequester.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      style={{ backgroundColor: "#fafaf9" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "shadow-sm border-b border-gray-200"
          : ""
      }`}
    >
      <div className="container mx-auto max-w-[1440px] px-6 lg:px-12">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src={logoIcon}
              alt="SideQuesters Logo"
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    location.pathname === link.href
                      ? "text-gray-900"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Button variant="hero" size="default" asChild>
              <Link to="/work">View Our Work</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-full"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-2 border-t border-gray-200">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  location.pathname === link.href
                    ? "bg-pink/10 text-gray-900"
                    : "text-gray-500 hover:bg-pink/10 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 pt-2">
              <Button variant="hero" size="default" className="w-full" asChild>
                <Link to="/work">View Our Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

// import { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Menu, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import ThemeToggle from "@/components/ThemeToggle";
// import logoIcon from "@/assets/sidequester.png";

// const navLinks = [
//   { label: "Home", href: "/" },
//   { label: "Services", href: "/services" },
//   { label: "Work", href: "/work" },
//   { label: "About", href: "/about" },
//   { label: "Contact", href: "/contact" },
// ];

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//   }, [location]);

//   return (
//     <header
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         isScrolled
//           ? "bg-[#f5f0f0]/95 backdrop-blur-md border-b border-[#e8e0e0] shadow-sm"
//           : "bg-[#f5f0f0]"
//       }`}
//     >
//       <div className="container mx-auto max-w-[1440px] px-6 lg:px-12">
//         <nav className="flex items-center justify-between h-20">
//           {/* Logo */}
//           <Link to="/" className="flex items-center group">
//             <img
//               src={logoIcon}
//               alt="SideQuesters Logo"
//               className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
//             />
//           </Link>

//           {/* Desktop Navigation Links */}
//           <ul className="hidden md:flex items-center gap-8">
//             {navLinks.map((link) => (
//               <li key={link.label}>
//                 <Link
//                   to={link.href}
//                   className={`text-sm font-medium transition-colors duration-200 ${
//                     location.pathname === link.href
//                       ? "text-gray-900"
//                       : "text-gray-500 hover:text-gray-900"
//                   }`}
//                 >
//                   {link.label}
//                 </Link>
//               </li>
//             ))}
//           </ul>

//           {/* Desktop Actions */}
//           <div className="hidden md:flex items-center gap-4">
//             <ThemeToggle />
//             <Button variant="hero" size="default" asChild>
//               <Link to="/work">View Our Work</Link>
//             </Button>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="flex md:hidden items-center gap-2">
//             <ThemeToggle />
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="rounded-full"
//               aria-label="Toggle mobile menu"
//             >
//               {isMobileMenuOpen ? (
//                 <X className="h-5 w-5" />
//               ) : (
//                 <Menu className="h-5 w-5" />
//               )}
//             </Button>
//           </div>
//         </nav>

//         {/* Mobile Menu */}
//         <div
//           className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
//             isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
//           }`}
//         >
//           <div className="py-4 space-y-2 border-t border-[#e8e0e0]">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.label}
//                 to={link.href}
//                 className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
//                   location.pathname === link.href
//                     ? "bg-pink/10 text-gray-900"
//                     : "text-gray-500 hover:bg-pink/10 hover:text-gray-900"
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//             <div className="px-4 pt-2">
//               <Button variant="hero" size="default" className="w-full" asChild>
//                 <Link to="/work">View Our Work</Link>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

// import { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Menu, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import ThemeToggle from "@/components/ThemeToggle";
// import logoIcon from "@/assets/sidequester.png";

// const navLinks = [
//   { label: "Home", href: "/" },
//   { label: "Services", href: "/services" },
//   { label: "Work", href: "/work" },
//   { label: "About", href: "/about" },
//   { label: "Contact", href: "/contact" },
// ];

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//   }, [location]);

//   return (
//     <header
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         isScrolled
//           ? "bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm"
//           : "bg-transparent"
//       }`}
//     >
//       <div className="container mx-auto max-w-[1440px] px-6 lg:px-12">
//         <nav className="flex items-center justify-between h-20">
//           {/* Logo */}
//           <Link to="/" className="flex items-center group">
//             <img
//               src={logoIcon}
//               alt="SideQuesters Logo"
//               className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
//             />
//           </Link>

//           {/* Desktop Navigation Links */}
//           <ul className="hidden md:flex items-center gap-8">
//             {navLinks.map((link) => (
//               <li key={link.label}>
//                 <Link
//                   to={link.href}
//                   className={`text-sm font-medium transition-colors duration-200 ${
//                     location.pathname === link.href
//                       ? "text-foreground"
//                       : "text-muted-foreground hover:text-foreground"
//                   }`}
//                 >
//                   {link.label}
//                 </Link>
//               </li>
//             ))}
//           </ul>

//           {/* Desktop Actions */}
//           <div className="hidden md:flex items-center gap-4">
//             <ThemeToggle />
//             <Button variant="hero" size="default" asChild>
//               <Link to="/work">View Our Work</Link>
//             </Button>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="flex md:hidden items-center gap-2">
//             <ThemeToggle />
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="rounded-full"
//               aria-label="Toggle mobile menu"
//             >
//               {isMobileMenuOpen ? (
//                 <X className="h-5 w-5" />
//               ) : (
//                 <Menu className="h-5 w-5" />
//               )}
//             </Button>
//           </div>
//         </nav>

//         {/* Mobile Menu */}
//         <div
//           className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
//             isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
//           }`}
//         >
//           <div className="py-4 space-y-2 border-t border-border/50">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.label}
//                 to={link.href}
//                 className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
//                   location.pathname === link.href
//                     ? "bg-secondary text-foreground"
//                     : "text-muted-foreground hover:bg-secondary hover:text-foreground"
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//             <div className="px-4 pt-2">
//               <Button variant="hero" size="default" className="w-full" asChild>
//                 <Link to="/work">View Our Work</Link>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;


// import { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Menu, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import ThemeToggle from "@/components/ThemeToggle";
// import logoIcon from "@/assets/sidequester.png";
// //import logoIcon from "@/assets/logo-icon.png";

// const navLinks = [
//   { label: "Home", href: "/" },
//   { label: "Services", href: "/services" },
//   { label: "Work", href: "/work" },
//   { label: "About", href: "/about" },
//   { label: "Contact", href: "/contact" },
// ];

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//   }, [location]);

//   return (
//     <header
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         isScrolled
//           ? "bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm"
//           : "bg-transparent"
//       }`}
//     >
//       <div className="container mx-auto max-w-[1440px] px-6 lg:px-12">
//         <nav className="flex items-center justify-between h-20">
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-2 group">
//             <img
//               src={logoIcon}
//               alt="SideQuesters Logo"
//               className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
//             />
//           </Link>

//           {/* Desktop Navigation Links */}
//           <ul className="hidden md:flex items-center gap-8">
//             {navLinks.map((link) => (
//               <li key={link.label}>
//                 <Link
//                   to={link.href}
//                   className={`text-sm font-medium transition-colors duration-200 ${
//                     location.pathname === link.href
//                       ? "text-foreground"
//                       : "text-muted-foreground hover:text-foreground"
//                   }`}
//                 >
//                   {link.label}
//                 </Link>
//               </li>
//             ))}
//           </ul>

//           {/* Desktop Actions */}
//           <div className="hidden md:flex items-center gap-4">
//             <ThemeToggle />
//             <Button variant="hero" size="default" asChild>
//               <Link to="/work">View Our Work</Link>
//             </Button>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="flex md:hidden items-center gap-2">
//             <ThemeToggle />
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="rounded-full"
//               aria-label="Toggle mobile menu"
//             >
//               {isMobileMenuOpen ? (
//                 <X className="h-5 w-5" />
//               ) : (
//                 <Menu className="h-5 w-5" />
//               )}
//             </Button>
//           </div>
//         </nav>

//         {/* Mobile Menu */}
//         <div
//           className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
//             isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
//           }`}
//         >
//           <div className="py-4 space-y-2 border-t border-border/50">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.label}
//                 to={link.href}
//                 className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
//                   location.pathname === link.href
//                     ? "bg-secondary text-foreground"
//                     : "text-muted-foreground hover:bg-secondary hover:text-foreground"
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//             <div className="px-4 pt-2">
//               <Button variant="hero" size="default" className="w-full" asChild>
//                 <Link to="/work">View Our Work</Link>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;
