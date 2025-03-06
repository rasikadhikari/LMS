import { useEffect, useState } from "react";
import axios from "../Service/axios"; // Assuming you have an axios setup for API calls

interface ResourceMaterial {
  type: string;
  url: string;
}

interface Lesson {
  _id: string;
  title: string;
  content: string;
  courseId: { courseName: string }; // Populate courseId to get courseName
  resourceMaterial: ResourceMaterial[];
}

const LessonTable = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get("/lesson");
        setLessons(response.data.data);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  const handleEdit = (id: string) => {
    console.log("Edit lesson with ID:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete lesson with ID:", id);
  };

  if (loading) {
    return <div className="p-6 text-center">Loading lessons...</div>;
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Lesson List</h2>
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
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
            <tr key={lesson._id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{lesson.title}</td>
              <td className="px-4 py-2">{lesson.content}</td>
              <td className="px-4 py-2">
                {lesson.courseId?.courseName || "N/A"}
              </td>
              <td className="px-4 py-2">
                {lesson.resourceMaterial.map((resource, index) => (
                  <div key={index}>
                    <a href={resource.url} className="text-blue-500">
                      {resource.type.toUpperCase()}
                    </a>
                  </div>
                ))}
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleEdit(lesson._id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(lesson._id)}
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

export default LessonTable;
