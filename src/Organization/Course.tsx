import { useEffect, useState } from "react";
import axios from "../Service/axios"; // Assuming you have this setup for axios instance

interface CourseType {
  _id: string;
  courseName: string;
  courseId: string;
  description: string;
  organization: { name: string } | null;
}

function Course() {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/course");
        setCourses(response.data.data);
        console.log(response);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-white">Loading courses...</div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen p-6">
      {/* Courses Table */}
      <h2 className="text-4xl font-extrabold mb-4">Course List</h2>
      <table className="min-w-full table-auto bg-gray-800 rounded-lg shadow-lg">
        <thead>
          <tr>
            <th className="px-6 py-2 text-left text-lg">Course Name</th>
            <th className="px-6 py-2 text-left text-lg">Course ID</th>
            <th className="px-6 py-2 text-left text-lg">Description</th>
            <th className="px-6 py-2 text-left text-lg">Organization</th>
            <th className="px-6 py-2 text-left text-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id} className="border-b border-gray-700">
              <td className="px-6 py-4">{course.courseName}</td>
              <td className="px-6 py-4">{course.courseId}</td>
              <td className="px-6 py-4">
                {course.description.substring(0, 100)}
              </td>
              <td className="px-6 py-4">
                {course.organization?.name || "N/A"}
              </td>
              <td className="px-6 py-4">
                <button className="text-blue-400 hover:text-blue-600">
                  Edit
                </button>{" "}
                |{" "}
                <button className="text-red-400 hover:text-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Course;
