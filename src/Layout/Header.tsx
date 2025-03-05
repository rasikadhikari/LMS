import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="w-full bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo or Title */}
        <h1 className="text-2xl font-bold">LMS</h1>

        {/* Navigation Links (from sidebar) */}
        <nav className="flex space-x-6">
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
        </nav>

        {/* Login/Signup Section (kept from your header) */}
        <div className="flex space-x-4">
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
        </div>
      </div>
    </header>
  );
}

export default Header;
