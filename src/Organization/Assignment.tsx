import { useEffect, useState } from "react";
import axios from "../Service/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Course {
  _id: string;
  courseName: string;
}

interface Lesson {
  _id: string;
  title: string;
}

interface Assignment {
  _id: string;
  question: string;
  course: Course;
  lesson: Lesson;
}

const AssignmentTable = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get("/assignment");
        console.log("API Response:", response.data);
        setAssignments(response.data);
        toast.success("Assignments loaded successfully!");
      } catch (error) {
        console.error("Error fetching assignments:", error);
        toast.error("Failed to load assignments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this assignment?")) {
      return;
    }

    try {
      await axios.delete(`/assignment/${id}`);
      setAssignments(assignments.filter((assignment) => assignment._id !== id));
      toast.success("Assignment deleted successfully!");
      console.log("Assignment deleted successfully.");
    } catch (error) {
      console.error("Error deleting assignment:", error);
      toast.error("Failed to delete assignment.");
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-white">Loading assignments...</div>
    );
  }

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <h2 className="text-4xl font-extrabold mb-4">Assignment List</h2>
      <button
        onClick={() => navigate("/admin/createAssignment")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer mb-4"
      >
        Add Assignment
      </button>
      <table className="min-w-full table-auto bg-gray-800 rounded-lg shadow-lg">
        <thead className="bg-black">
          <tr>
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Question</th>
            <th className="px-4 py-2 text-left">Course</th>
            <th className="px-4 py-2 text-left">Lesson</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments && assignments.length > 0 ? (
            assignments.map((assignment, index) => (
              <tr key={assignment._id} className="border-b border-gray-700">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{assignment.question}</td>
                <td className="px-4 py-2">
                  {assignment.course?.courseName || "N/A"}
                </td>
                <td className="px-4 py-2">
                  {assignment.lesson?.title || "N/A"}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() =>
                      navigate(`/admin/editAssignment/${assignment._id}`)
                    }
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2 cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(assignment._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center p-4 text-gray-600">
                No assignments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AssignmentTable;
