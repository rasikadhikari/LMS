import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white shadow-md">
      <nav className="p-6">
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              onClick={() => {
                navigate("/dashboard");
              }}
              className="block py-3 px-6 hover:bg-gray-700 rounded"
            >
              Home
            </a>
          </li>
          <li>
            <a href="#" className="block py-3 px-6 hover:bg-gray-700 rounded">
              Profile
            </a>
          </li>
          <li>
            <a href="#" className="block py-3 px-6 hover:bg-gray-700 rounded">
              Course
            </a>
          </li>
          <li>
            <a href="#" className="block py-3 px-6 hover:bg-gray-700 rounded">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
