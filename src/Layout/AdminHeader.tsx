import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icons for mobile menu

const AdminHeader = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("auth"); // Clear full auth data
    navigate("/login"); // Redirect to login page
  };

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Left: Title */}
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-blue-400">Admin Dashboard</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link
            to="/admin/adminCourse"
            className="hover:text-blue-400 transition"
          >
            Courses
          </Link>
          <Link
            to="/admin/adminEnrollment"
            className="hover:text-blue-400 transition"
          >
            Enrollments
          </Link>
          <Link
            to="/admin/adminLesson"
            className="hover:text-blue-400 transition"
          >
            Lessons
          </Link>
          <Link to="/" className="hover:text-blue-400 transition">
            Student Dashboard
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Right: Logout Button */}
        <button
          onClick={handleLogout}
          className="hidden md:block bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold transition"
        >
          Logout
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 text-white p-4 space-y-3">
          <Link to="/admin/adminCourse" className="block hover:text-blue-400">
            Courses
          </Link>
          <Link
            to="/admin/adminEnrollment"
            className="block hover:text-blue-400"
          >
            Enrollments
          </Link>
          <Link to="/admin/adminLesson" className="block hover:text-blue-400">
            Lessons
          </Link>
          <Link to="/" className="block hover:text-blue-400">
            Student Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold transition"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default AdminHeader;
