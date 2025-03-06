import { useEffect, useState } from "react";
import axios from "../Service/axios"; // Use your axios setup

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

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await axios.get("/enroll");
        setEnrollments(response.data.data);
      } catch (error) {
        console.error("Failed to fetch enrollments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  const handleEdit = (id: string) => {
    console.log("Edit Enrollment:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete Enrollment:", id);
  };

  if (loading) {
    return <div className="p-6 text-center">Loading enrollments...</div>;
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Enrollment List</h2>
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Student</th>
            <th className="px-4 py-2 text-left">Course</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map((enrollment) => (
            <tr key={enrollment._id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{enrollment.student?.name || "N/A"}</td>
              <td className="px-4 py-2">
                {enrollment.course?.courseName || "N/A"}
              </td>
              <td className="px-4 py-2 capitalize">{enrollment.status}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleEdit(enrollment._id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(enrollment._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
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
