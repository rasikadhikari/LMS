import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "../../Service/axios";
import { useNavigate } from "react-router-dom";

function CreateLesson() {
  // State for form data
  const [lesson, setLesson] = useState({
    title: "",
    content: "",
    courseId: "",
  });

  // State for selected file
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // State for available courses
  const [courses, setCourses] = useState<{ _id: string; courseName: string }[]>(
    []
  );
  const navigate = useNavigate();

  // Fetch courses when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/course");
        setCourses(response.data.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };
    fetchCourses();
  }, []);

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLesson((prevLesson) => ({
      ...prevLesson,
      [name]: value,
    }));
  };

  // Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("title", lesson.title);
    formData.append("content", lesson.content);
    formData.append("courseId", lesson.courseId);
    formData.append("resourceMaterial", selectedFile); // File upload

    try {
      const response = await axios.post("/lesson", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Lesson created successfully!");
      console.log(response.data);
      navigate("/admin/adminLesson");
    } catch (err) {
      console.error("Error creating lesson:", err);
      alert("Failed to create lesson.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Create New Lesson
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium">Title:</label>
            <input
              type="text"
              name="title"
              value={lesson.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-gray-700 font-medium">Content:</label>
            <textarea
              name="content"
              value={lesson.content}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            ></textarea>
          </div>

          {/* Course (Dropdown) */}
          <div>
            <label className="block text-gray-700 font-medium">Course:</label>
            <select
              name="courseId"
              value={lesson.courseId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Select Course</option>
              {courses.length > 0 ? (
                courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.courseName}
                  </option>
                ))
              ) : (
                <option disabled>No courses available</option>
              )}
            </select>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-gray-700 font-medium">
              Upload Resource (PDF):
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            Create Lesson
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateLesson;
