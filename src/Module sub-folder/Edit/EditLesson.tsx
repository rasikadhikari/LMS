import { FormEvent, useEffect, useState, ChangeEvent } from "react";
import axios from "../../Service/axios";
import { useNavigate, useParams } from "react-router-dom";

interface LessonData {
  title: string;
  content: string;
  courseId: { courseName: string } | null;
  resourceMaterial: { type: string; url: string }[];
}

function EditLesson() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState<LessonData>({
    title: "",
    content: "",
    courseId: null,
    resourceMaterial: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Fetch the lesson data to pre-populate the form
  useEffect(() => {
    const getLesson = async () => {
      try {
        const response = await axios.get(`/lesson/${id}`);
        const lessonData = response.data.data;
        console.log("lesson---", lessonData);
        setLesson({
          title: lessonData.title,
          content: lessonData.content,
          courseId: lessonData.courseId,
          resourceMaterial: lessonData.resourceMaterial,
        });
      } catch (err) {
        console.error("Error fetching lesson data:", err);
        setError("Error fetching lesson data");
      } finally {
        setLoading(false);
      }
    };

    getLesson();
  }, [id]);

  // Update form state when user makes changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLesson((prevLesson) => ({
      ...prevLesson,
      [name]: value,
    }));
  };

  // Update resource material at a specific index
  const handleResourceChange = (
    index: number,
    field: "type" | "url",
    value: string
  ) => {
    const updatedResources = [...lesson.resourceMaterial];
    updatedResources[index] = {
      ...updatedResources[index],
      [field]: value,
    };
    setLesson((prev) => ({
      ...prev,
      resourceMaterial: updatedResources,
    }));
  };

  // Submit form to update lesson details in the database
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/lesson/${id}`, lesson);
      alert("Lesson has been updated");
      navigate("/admin/adminLesson");
    } catch (err) {
      console.error("Error updating lesson:", err);
      setError("Error updating lesson");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-white">
        Loading Lesson details...
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6">Edit Lesson</h2>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label className="block mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={lesson.title}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        {/* Content */}
        <div className="mb-4">
          <label className="block mb-1">Content</label>
          <textarea
            name="content"
            value={lesson.content}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            rows={5}
            required
          />
        </div>
        {/* Course name (display only) */}
        <div className="mb-4">
          <label className="block mb-1">Course Name</label>
          <input
            type="text"
            name="courseId"
            value={lesson.courseId ? lesson.courseId?.courseName : ""}
            disabled
            className="w-full p-2 rounded bg-gray-700 text-gray-300"
          />
        </div>
        {/* Resource Materials */}
        {lesson.resourceMaterial && lesson.resourceMaterial.length > 0 && (
          <div className="mb-4">
            <label className="block mb-1">Resource Materials</label>
            {lesson.resourceMaterial.map((rm, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  name={`resourceMaterialType-${index}`}
                  value={rm.type}
                  onChange={(e) =>
                    handleResourceChange(index, "type", e.target.value)
                  }
                  className="w-1/3 p-2 rounded bg-gray-700 text-white"
                  placeholder="Type"
                  required
                />
                <input
                  type="text"
                  name={`resourceMaterialUrl-${index}`}
                  value={rm.url}
                  onChange={(e) =>
                    handleResourceChange(index, "url", e.target.value)
                  }
                  className="w-2/3 p-2 rounded bg-gray-700 text-white"
                  placeholder="URL"
                  required
                  disabled
                />
              </div>
            ))}
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditLesson;
