import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  // Centralized update function
  const refreshUser = () => {
    const stored = localStorage.getItem("user");
    setUser(stored ? JSON.parse(stored) : null);
  };

  useEffect(() => {
    // initial read
    refreshUser();

    // update when other tabs change localStorage
    const onStorage = (e: StorageEvent) => {
      if (e.key === "user") refreshUser();
    };
    window.addEventListener("storage", onStorage);

    // update when same-tab code dispatches "userChanged"
    const onUserChanged = () => refreshUser();
    window.addEventListener("userChanged", onUserChanged);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("userChanged", onUserChanged);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    // notify other listeners in same tab
    window.dispatchEvent(new Event("userChanged"));
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="w-full flex items-center justify-between py-5 px-6 md:px-10 bg-white shadow-sm">
      {/* Left side: Mobile Hamburger + Logo */}
      <div className="flex items-center gap-4">

        <Link to="/">
          <img src="/logo.png" alt="logo" className="h-12 w-auto" />
        </Link>
      </div>

      {/* Menu (hidden on mobile) */}
      <div className="hidden md:flex gap-20 text-gray-800 font-medium">
        <Link to="/projects">Investicijos žmonėms</Link>
        <Link to="/new">Projektų teikimas</Link>
        <Link to="/about">Apie RenewiFund</Link>
      </div>

      {/* Right side */}
      <div className="flex gap-4 items-center">
        {!user && (
          <Link to="/login">
            <button className="bg-[#A7E163] px-5 py-2 rounded-full font-semibold">
              Prisijungti
            </button>
          </Link>
        )}

        {user && (
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/dashboard")} className="text-sm text-gray-700 hidden sm:block">
              {user.name} {user.surname}
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-600"
            >
              Atsijungti
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
