import { Link, useNavigate } from "react-router-dom";

function Header() {
  return (
    <header className="w-full bg-black  text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-bold">LMS</h1>

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
