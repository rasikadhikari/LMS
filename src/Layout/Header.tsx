import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { Menu, X } from "lucide-react"; // Icons for the hamburger menu

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    context?.changeAuth("", null);
    navigate("/login");
    setMenuOpen(false); // Close menu on logout
  };

  const userRole = context?.auth?.role;

  return (
    <header className="w-full bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Left: Brand Logo */}
        <h1 className="text-2xl font-bold">LMS</h1>

        {/* Desktop Navigation (Hidden on mobile) */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/home" className="hover:bg-gray-700 py-2 px-4 rounded">
            Home
          </Link>
          <Link to="/profile" className="hover:bg-gray-700 py-2 px-4 rounded">
            Profile
          </Link>
          <Link to="/course" className="hover:bg-gray-700 py-2 px-4 rounded">
            Course
          </Link>
          <Link to="#" className="hover:bg-gray-700 py-2 px-4 rounded">
            Contact
          </Link>
          {userRole === "Admin" && (
            <Link
              to="/admin"
              className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              Dashboard
            </Link>
          )}
        </nav>

        {/* Right: Auth Buttons (Hidden on mobile) */}
        <div className="hidden md:flex space-x-4">
          {context?.auth?.token ? (
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                Signup
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Menu Button (Visible on Mobile) */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 text-white p-4 space-y-3">
          <Link
            to="/home"
            className="block py-2 px-4 hover:bg-gray-700"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/profile"
            className="block py-2 px-4 hover:bg-gray-700"
            onClick={() => setMenuOpen(false)}
          >
            Profile
          </Link>
          <Link
            to="/course"
            className="block py-2 px-4 hover:bg-gray-700"
            onClick={() => setMenuOpen(false)}
          >
            Course
          </Link>
          <Link
            to="#"
            className="block py-2 px-4 hover:bg-gray-700"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
          {userRole === "Admin" && (
            <Link
              to="/admin/adminCourse"
              className="block bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-700"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}

          {/* Mobile Auth Buttons */}
          {context?.auth?.token ? (
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="block bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block  text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
