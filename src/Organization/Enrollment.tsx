import { useEffect, useState } from "react";
import axios from "../Service/axios"; // Use your axios setup
import { useNavigate } from "react-router-dom";

interface StudentType {
  _id: string;
  name: string;
}

interface CourseType {
  _id: string;
  courseName: string;
}

interface EnrollmentType {
  _id: string;
  student: StudentType;
  course: CourseType;
  status: string;
}

const EnrollmentTable = () => {
  const [enrollments, setEnrollments] = useState<EnrollmentType[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await axios.get("/enroll");
        setEnrollments(response.data.data);
        console.log("enrollments---", response.data.data);
      } catch (error) {
        console.error("Failed to fetch enrollments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  const handleDelete = (id: string) => {
    console.log("Delete Enrollment:", id);
  };

  if (loading) {
    return <div className="p-6 text-center">Loading enrollments...</div>;
  }

  return (
    <div className="text-white bg-black min-h-screen p-6">
      <h2 className="text-4xl font-extrabold mb-4">Enrollment List</h2>

      <table className="min-w-full table-auto bg-gray-800 rounded-lg shadow-lg">
        <thead className="bg-black">
          <tr>
            <th className="px-4 py-2 text-left">Student</th>
            <th className="px-4 py-2 text-left">Course</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map((enrollment) => (
            <tr key={enrollment._id} className="border-b border-gray-700">
              <td className="px-4 py-2">{enrollment.student?.name || "N/A"}</td>
              <td className="px-4 py-2">
                {enrollment.course?.courseName || "N/A"}
              </td>
              <td className="px-4 py-2 capitalize">{enrollment.status}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() =>
                    navigate(`/admin/editEnrollment/${enrollment._id}`)
                  }
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2 cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(enrollment._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnrollmentTable;
