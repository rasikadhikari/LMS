import { useState } from "react";

function StudentPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activePage, setActivePage] = useState("Dashboard");
  const [courses] = useState([
    { id: 1, name: "React Basics", instructor: "John Doe", progress: 75 },
    { id: 2, name: "JavaScript Advanced", instructor: "Jane Smith", progress: 50 },
    { id: 3, name: "Tailwind Mastery", instructor: "Alice Brown", progress: 90 },
  ]);

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-5 space-y-6">
        <h1 className="text-2xl font-bold">Student Dashboard</h1>
        <nav className="space-y-4">
          <button onClick={() => setActivePage("Dashboard")} className={`block px-4 py-2 rounded-md ${activePage === "Dashboard" ? "bg-blue-700" : "hover:bg-blue-700"}`}>📚 Dashboard</button>
          <button onClick={() => setActivePage("Courses")} className={`block px-4 py-2 rounded-md ${activePage === "Courses" ? "bg-blue-700" : "hover:bg-blue-700"}`}>📖 My Courses</button>
          <button onClick={() => setActivePage("Assignments")} className={`block px-4 py-2 rounded-md ${activePage === "Assignments" ? "bg-blue-700" : "hover:bg-blue-700"}`}>📝 Assignments</button>
          <button onClick={() => setActivePage("Profile")} className={`block px-4 py-2 rounded-md ${activePage === "Profile" ? "bg-blue-700" : "hover:bg-blue-700"}`}>👤 Profile</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Navbar */}
        <header className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search courses..."
            className="px-4 py-2 border rounded-md w-1/3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex items-center space-x-4">
            <button className="p-2 bg-gray-200 rounded-md">🔔</button>
            <img src="https://i.pinimg.com/736x/32/b8/c9/32b8c9639eb371e8bc9a6f55889a6a28.jpg" className="w-10 h-10 rounded-full" alt="Profile" />
          </div>
        </header>

        {/* Conditional Page Rendering */}
        {activePage === "Dashboard" && (
          <h2 className="text-xl font-bold mb-4">Welcome to your Student Dashboard!</h2>
        )}

        {activePage === "Courses" && (
          <>
            <h2 className="text-xl font-bold mb-4">My Courses</h2>
            <div className="grid grid-cols-3 gap-6">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <div key={course.id} className="p-4 bg-white rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold">{course.name}</h3>
                    <p className="text-gray-500">Instructor: {course.instructor}</p>
                    <div className="mt-2 h-2 bg-gray-300 rounded-md">
                      <div
                        className="h-2 bg-blue-600 rounded-md"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{course.progress}% completed</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No courses found.</p>
              )}
            </div>
          </>
        )}

        {activePage === "Assignments" && (
          <h2 className="text-xl font-bold mb-4">Your Assignments will appear here.</h2>
        )}

        {activePage === "Profile" && (
          <h2 className="text-xl font-bold mb-4">Your Profile Details</h2>
        )}
      </main>
    </div>
  )
}

export default StudentPage
