import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MenuIcon, CloseIcon } from "./icons";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Destinations", to: "/destinations" },
  { label: "Itinerary", to: "/itinerary" },
  { label: "Packages", to: "/packages" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-[#E5E7E0] bg-[#F5F4EF]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link to="/" className="text-xl font-extrabold tracking-tight text-[#14201A]">
          AuraAvenue
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.to;
            return (
              <Link
                key={link.label}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-[#1EA35B] ${
                  isActive ? "text-[#1EA35B]" : "text-[#3B443E]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Auth buttons — desktop only */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="text-sm font-semibold text-[#3B443E] transition-colors hover:text-[#1EA35B]"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="rounded-full bg-[#1EA35B] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#167A44]"
          >
            Sign up
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex items-center gap-2 rounded-full bg-[#1EA35B] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#167A44] md:hidden"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <CloseIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
          Menu
        </button>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-[#E5E7E0] bg-[#F5F4EF] px-6 py-3 md:hidden">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.to;
            return (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isActive ? "bg-white text-[#1EA35B]" : "text-[#3B443E] hover:bg-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Auth buttons — mobile menu */}
          <div className="mt-2 flex flex-col gap-2 border-t border-[#E5E7E0] pt-3">
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 text-center text-sm font-semibold text-[#3B443E] hover:bg-white"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg bg-[#1EA35B] px-3 py-2.5 text-center text-sm font-semibold text-white hover:bg-[#167A44]"
            >
              Sign up
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}