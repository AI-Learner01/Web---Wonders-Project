import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [currentUser, setCurrentUser] = useState(null);

  const checkCurrentUser = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/verify-token", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        // Backend se name receive karke state me store kar rahe hain
        setCurrentUser({ 
          email: data.email, 
          name: data.name || "", 
          role: data.role 
        });
      } else {
        setCurrentUser(null);
      }
    } catch (error) {
      console.error("Error checking current user:", error);
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    checkCurrentUser();
  }, []);

  // Dropdown ke bahar click karne par close karne ka logic
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // First letter nikalne ke liye helper (Priority: Name -> Email -> 'U')
  const getInitial = () => {
    if (currentUser?.name && currentUser.name.trim().length > 0) {
      return currentUser.name.trim()[0].toUpperCase();
    }
    if (currentUser?.email && currentUser.email.trim().length > 0) {
      return currentUser.email.trim()[0].toUpperCase();
    }
    return "U";
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        setCurrentUser(null);
        setProfileDropdownOpen(false);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

    const navRight = () => {
    if (currentUser?.email) {
      return (
        <div className="relative" ref={dropdownRef}>
          {/* Professional Profile Pill Button */}
          <button
            onClick={() => setProfileDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-full border border-gray-200 bg-white p-1 pr-3 shadow-sm transition-all duration-200 hover:border-emerald-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            aria-label="User Profile"
            aria-expanded={profileDropdownOpen}
          >
            {/* Avatar Circle - shrink-0 prevents it from getting squished */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#167A44] to-emerald-600 text-sm font-bold text-white shadow-inner">
              {getInitial()}
            </div>
            
            {/* User First Name - truncate prevents layout breaking on long names */}
            <span className="hidden max-w-[100px] truncate text-sm font-bold text-gray-700 sm:block">
              {currentUser.name ? currentUser.name.split(' ')[0] : 'User'}
            </span>

            {/* Dropdown Chevron Arrow - Rotates when menu is open */}
            <svg 
              className={`hidden sm:block h-4 w-4 text-gray-400 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Profile Dropdown Menu */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-100 bg-white p-2 shadow-xl z-50 animate-in fade-in zoom-in duration-200">
              {/* User Info Header */}
              <div className="border-b border-gray-100 px-3 py-2.5 mb-1 bg-gray-50/50 rounded-t-lg">
                <p className="text-sm font-bold text-gray-800 truncate">
                  {currentUser.name || "User"}
                </p>
                <p className="text-xs text-gray-500 truncate mt-0.5">
                  {currentUser.email}
                </p>
              </div>

              {/* Navigation Options */}
              <div className="py-1">
                <Link
                  to="/profile"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-emerald-50 hover:text-[#167A44] rounded-lg transition"
                >
                  <span className="text-lg">👤</span> My Profile
                </Link>
                
                {currentUser.role === 'admin' && (
                  <Link
                    to="/admin"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-emerald-50 hover:text-[#167A44] rounded-lg transition"
                  >
                    <span className="text-lg">⚙️</span> Admin Panel
                  </Link>
                )}
              </div>

              {/* Logout Option */}
              <div className="border-t border-gray-100 pt-1 mt-1">
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-2.5 px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <span className="text-lg">🚪</span> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }
    
    // ... keep the existing Log in / Sign up return block ...
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
          className="rounded-full bg-[#167A44] px-5 py-2 text-sm font-semibold text-white hover:bg-[#125E36] transition"
        >
          Sign up
        </Link>
      </>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#E5E7E0] bg-[#F5F4EF]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link to="/" className="text-xl font-extrabold tracking-tight text-[#14201A]">
          AuraAvenue
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.to;
            return (
              <Link
                key={link.label}
                to={link.to}
                className={`group relative inline-block py-1 text-sm font-medium transition-colors hover:text-[#167A44] ${
                  isActive ? "text-[#167A44]" : "text-[#3B443E]"
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-0.5 left-0 h-[2px] bg-[#167A44] transition-all duration-300 ease-out motion-reduce:transition-none ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Auth / Profile Area — Desktop */}
        <div className="hidden items-center gap-3 md:flex">
          {navRight()}
        </div>

        {/* Mobile Menu Button */}
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

      {/* Mobile Drawer Navigation */}
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
                  isActive ? "bg-white text-[#167A44]" : "text-[#3B443E] hover:bg-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Auth / Profile Area — Mobile */}
          <div className="mt-2 flex flex-col gap-2 border-t border-[#E5E7E0] pt-3">
            {navRight()}
          </div>
        </nav>
      )}
    </header>
  );
}