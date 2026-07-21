import { useEffect, useState } from "react";
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


  const [currentUserEmail, setcurrentUserEmail] = useState(null);
  const checkCurrentUser = async () => {
    try {

      const response = await fetch("http://localhost:5000/auth/verify-token", {
        method: "POST",
        credentials: "include"
      });

      const data = await response.json();

      if (data.success) {
        setcurrentUserEmail(data.email);
      }
      else {
        setcurrentUserEmail(null);
      }
    } catch (error) {
      console.error("Error checking current user:", error);
      setcurrentUserEmail(null);
    }
  }
  useEffect(() => {
    checkCurrentUser();
  }, []);

  const navRight = () => {
    if (currentUserEmail) {
      return (
        <>
          <span className="text-sm font-semibold text-[#3B443E]">
            {currentUserEmail}
          </span>

          <button className="rounded-full bg-red-500 px-5 py-2 text-sm font-semibold text-white"
            onClick={async () => {
              try {
                const response = await fetch("http://localhost:5000/auth/logout", {
                  method: "POST",
                  credentials: "include",
                });
                const data = await response.json();
                if (data.success) {
                  setcurrentUserEmail(null);
                  alert(data.message);
                }
              } catch (error) {
                console.error("Error logging out:", error);
              }
            }}>
            Logout
          </button>
        </>
      );
    }

    return (
      <>
        <Link
          to="/login"
          className="text-sm font-semibold text-[#3B443E] hover:text-[#167A44]"
        >
          Log in
        </Link>

        <Link
          to="/signup"
          className="rounded-full bg-[#167A44] px-5 py-2 text-sm font-semibold text-white"
        >
          Sign up
        </Link>
      </>
    );

  }






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
                className={`group relative inline-block py-1 text-sm font-medium transition-colors hover:text-[#167A44] ${isActive ? "text-[#167A44]" : "text-[#3B443E]"
                  }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-0.5 left-0 h-[2px] bg-[#167A44] transition-all duration-300 ease-out motion-reduce:transition-none ${isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Auth buttons — desktop only */}
        <div className="hidden items-center gap-3 md:flex">
          {navRight()}
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex items-center gap-2 rounded-full bg-[#167A44] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#125E36] md:hidden"
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
                className={`rounded-lg px-3 py-2.5 text-sm font-medium ${isActive ? "bg-white text-[#167A44]" : "text-[#3B443E] hover:bg-white"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Auth buttons — mobile menu */}
          <div className="mt-2 flex flex-col gap-2 border-t border-[#E5E7E0] pt-3">
            {navRight()}
          </div>
        </nav>
      )}
    </header>
  );
}