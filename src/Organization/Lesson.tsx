import { useEffect, useState } from "react";
import axios from "../Service/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ResourceMaterial {
  type: string;
  url: string;
}

interface Lesson {
  _id: string;
  title: string;
  content: string;
  courseId: { courseName: string };
  resourceMaterial: ResourceMaterial[];
}

const LessonTable = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const response = await axios.get("/lesson");
      setLessons(response.data.data);
      toast.success("Lessons loaded successfully!");
    } catch (error) {
      console.error("Error fetching lessons:", error);
      toast.error("Failed to load lessons.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this lesson?")) {
      return;
    }

    try {
      await axios.delete(`/lesson/${id}`);
      setLessons(lessons.filter((lesson) => lesson._id !== id));
      toast.success("Lesson deleted successfully!");
      console.log("Lesson deleted successfully.");
    } catch (error) {
      console.error("Error deleting lesson:", error);
      toast.error("Failed to delete lesson.");
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading lessons...</div>;
  }

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <h2 className="text-4xl font-extrabold mb-4">Lesson List</h2>
      <button
        onClick={() => navigate("/admin/createLesson")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer"
      >
        Add Lesson
      </button>
      <table className="min-w-full table-auto bg-gray-800 rounded-lg shadow-lg mt-4">
        <thead className="bg-black">
          <tr>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Content</th>
            <th className="px-4 py-2 text-left">Course</th>
            <th className="px-4 py-2 text-left">Resources</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {lessons.map((lesson) => (
            <tr key={lesson._id} className="border-b border-gray-700">
              <td className="px-4 py-2">{lesson.title}</td>
              <td className="px-4 py-2">{lesson.content}</td>
              <td className="px-4 py-2">
                {lesson.courseId?.courseName || "N/A"}
              </td>
              <td className="px-4 py-2">
                {lesson.resourceMaterial.map((resource, index) => (
                  <div key={index}>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      {resource.type.toUpperCase()}
                    </a>
                  </div>
                ))}
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => navigate(`/admin/editLesson/${lesson._id}`)}
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2 cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(lesson._id)}
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

export default LessonTable;
