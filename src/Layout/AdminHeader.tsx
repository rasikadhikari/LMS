import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear auth token
    navigate("/login"); // Redirect to login page
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      {/* Left: Title and Navigation */}
      <div>
        <h1 className="text-xl">Admin Dashboard</h1>
        <nav className="mt-2">
          <a href="/admin/adminCourse" className="mr-4">
            Courses
          </a>
          <a href="/admin/adminEnrollment" className="mr-4">
            Enrollments
          </a>
          <a href="/admin/adminLesson">Lessons</a>
        </nav>
      </div>

      {/* Right: Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-bold transition"
      >
        Logout
      </button>
    </header>
  );
};

export default AdminHeader;
