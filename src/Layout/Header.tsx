import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

function Header() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    context?.changeAuth(""); // Clear auth context
    navigate("/login"); // Redirect to login page
  };

  const user = context?.auth?.user; // Fetch user details (assuming `auth` has `user` object like { name: "John" })

  return (
    <header className="w-full bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo or Title */}
        <h1 className="text-2xl font-bold">LMS</h1>

        {/* Navigation Links */}
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

        {/* Login/Signup OR User Welcome + Logout */}
        <div className="flex space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-white">Welcome, {user.name}!</span>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
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
      </div>
    </header>
  );
}

export default Header;
