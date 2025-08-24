import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ role }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold flex items-center gap-2">
              <span>🏥</span> Operation Scheduler
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link className="hover:text-gray-200 transition" to="/">Home</Link>
            {!role && (
              <>
                <Link className="hover:text-gray-200 transition" to="/login">Login</Link>
                <Link className="hover:text-gray-200 transition" to="/register">Register</Link>
              </>
            )}
            {role === "admin" && (
              <>
                <Link className="hover:text-gray-200 transition" to="/doctors">Doctors</Link>
                <Link className="hover:text-gray-200 transition" to="/patients">Patients</Link>
                <Link className="hover:text-gray-200 transition" to="/ots">OTs</Link>
                <Link className="hover:text-gray-200 transition" to="/surgeries">Surgeries</Link>
              </>
            )}
            {role === "user" && (
              <>
                <Link className="hover:text-gray-200 transition" to="/doctors">Doctors</Link>
                <Link className="hover:text-gray-200 transition" to="/surgeries">Surgeries</Link>
              </>
            )}
            {role && <Link className="hover:text-gray-200 transition" to="/profile">Profile</Link>}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-red-700 px-2 pt-2 pb-4 space-y-1">
          <Link className="block px-3 py-2 rounded hover:bg-blue-600 transition" to="/">Home</Link>
          {!role && (
            <>
              <Link className="block px-3 py-2 rounded hover:bg-blue-600 transition" to="/login">Login</Link>
              <Link className="block px-3 py-2 rounded hover:bg-blue-600 transition" to="/register">Register</Link>
            </>
          )}
          {role === "admin" && (
            <>
              <Link className="block px-3 py-2 rounded hover:bg-blue-600 transition" to="/doctors">Doctors</Link>
              <Link className="block px-3 py-2 rounded hover:bg-blue-600 transition" to="/patients">Patients</Link>
              <Link className="block px-3 py-2 rounded hover:bg-blue-600 transition" to="/ots">OTs</Link>
              <Link className="block px-3 py-2 rounded hover:bg-blue-600 transition" to="/surgeries">Surgeries</Link>
            </>
          )}
          {role === "user" && (
            <>
              <Link className="block px-3 py-2 rounded hover:bg-blue-600 transition" to="/doctors">Doctors</Link>
              <Link className="block px-3 py-2 rounded hover:bg-blue-600 transition" to="/surgeries">Surgeries</Link>
            </>
          )}
          {role && <Link className="block px-3 py-2 rounded hover:bg-blue-600 transition" to="/profile">Profile</Link>}
        </div>
      )}
    </nav>
  );
}
