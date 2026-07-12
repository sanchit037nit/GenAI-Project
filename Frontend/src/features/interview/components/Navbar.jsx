import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../hooks/useAuth'
import { Trash2, User, ChevronDown } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { loading, handleLogin ,user } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full backdrop-blur-md bg-gray-900/80 shadow-xl z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">

        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/ranpass")}
        >
          
          <h1 className="text-2xl font-bold text-white tracking-wide hover:text-amber-400 transition">
            Interview Strategy
          </h1>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-4">



          {/* Auth Buttons */}
          {user && (
            <>


              {/* Dashboard */}
              <button
                onClick={() => navigate("/dashboard")}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 text-white font-semibold shadow-md hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300"
              >
                Dashboard
              </button>

              {/* 🗑 Recycle Bin (OUTSIDE Account) */}
              <button
                onClick={() => navigate("/recycle-bin")}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow-md hover:shadow-red-500/40 hover:scale-105 transition-all duration-300"
              >
                <Trash2 size={18} />
                Recycle Bin
              </button>
            </>
          )}

          {/* Account Dropdown */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/80 backdrop-blur-md border border-gray-700 text-white hover:bg-gray-700 transition-all"
              >
                <User size={18} />
                Account
                <ChevronDown size={16} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900/90 backdrop-blur-xl border border-gray-700 rounded-xl shadow-xl flex flex-col py-1 z-50">

                  <button
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                    }}
                    className="text-left px-4 py-2 hover:bg-gray-700 transition rounded-md"
                  >
                    Logout
                  </button>

                  <button
                    onClick={() => {
                      deleteaccount();
                      setDropdownOpen(false);
                    }}
                    className="text-left px-4 py-2 hover:bg-red-600 hover:text-white transition rounded-md"
                  >
                    Delete Account
                  </button>

                </div>
              )}
            </div>
          )}

          {/* Login / Signup */}
          {!user && (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 font-semibold hover:scale-105 transition-all"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 text-white font-semibold hover:scale-105 transition-all"
              >
                Signup
              </button>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default Navbar;