import { Link } from "react-router-dom";
import { Mail, Instagram, Linkedin } from "lucide-react";
import logoIcon from "@/assets/sidequester.png";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto max-w-[1440px] px-6 lg:px-12 py-6">

        {/* Main Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

          {/* Left — Logo + Tagline */}
          <div className="flex flex-col gap-1">
            <Link to="/">
              <img
                src={logoIcon}
                alt="SideQuesters Logo"
                className="h-8 w-auto object-contain cursor-pointer"
              />
            </Link>
            <p className="text-xs text-gray-500 max-w-[220px] leading-relaxed mt-1">
              From logo to launch-ready digital systems, everything in one place.
            </p>
          </div>

          {/* Center — Nav Links */}
          <div className="flex items-center gap-8">
            {[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: "Work", href: "/work" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right — Social Icon Circles */}
          <div className="flex items-center gap-2">

            <a
              href="https://mail.google.com/mail/?view=cm&to=sidequesters.in@gmail.com"
              className="w-9 h-9 rounded-full bg-gradient-to-br from-pink to-lavender flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
            >
              <Mail className="w-4 h-4 text-white" />
            </a>

            <a
              href="https://www.linkedin.com/in/sidequesters-in"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gradient-to-br from-pink to-lavender flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
            >
              <Linkedin className="w-4 h-4 text-white" />
            </a>

            <a
              href="https://www.instagram.com/sidequesters.in/?utm_source=ig_web_button_share_sheet"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gradient-to-br from-pink to-lavender flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
            >
              <Instagram className="w-4 h-4 text-white" />
            </a>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-4 pt-4 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} SideQuesters. All rights reserved. · Remote / India
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;