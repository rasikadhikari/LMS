import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../Service/axios";

interface Assignment {
  _id: string;
  course: { courseName: string } | null;
  lesson: { title: string } | null;
  question: string;
}

const EditAssignment = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await axios.get(`/assignment/${id}`);
        console.log("API Response:", response.data);
        setAssignment(response.data);
      } catch (err) {
        setError("Error fetching assignment details.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAssignment(
      (prev) => prev && { ...prev, [e.target.name]: e.target.value }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignment) return;

    try {
      await axios.put(`/assignment/${id}`, {
        course: assignment.course,
        lesson: assignment.lesson,
        question: assignment.question,
      });
      navigate("/admin/adminAssignment");
    } catch (err) {
      setError("Error updating assignment.");
    }
  };

  if (loading)
    return <div className="p-6 text-center">Loading assignment...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <h2 className="text-4xl font-extrabold mb-4">Edit Assignment</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label className="block mb-2">Course ID</label>
          <input
            type="text"
            name="course"
            value={assignment?.course?.courseName || ""}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            disabled
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Lesson ID</label>
          <input
            type="text"
            name="lesson"
            value={assignment?.lesson?.title || ""}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            disabled
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Question</label>
          <textarea
            name="question"
            value={assignment?.question || ""}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white cursor-pointer"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditAssignment;
