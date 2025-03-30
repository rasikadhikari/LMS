import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "../../Service/axios";

interface CourseData {
  courseName: string;
  courseId: string;
  description: string;
  organization: { name: string } | null;
  price: string;
  Lecturer: string;
}

const EditCourse = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<CourseData>({
    courseName: "",
    courseId: "",
    description: "",
    organization: null,
    price: "",
    Lecturer: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Fetch the course data to pre-populate the form
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/course/${id}`);
        // Assuming response.data.data holds the course object
        const courseData = response.data.data;
        console.log(courseData);
        setCourse({
          courseName: courseData.courseName,
          courseId: courseData.courseId,
          description: courseData.description,
          organization: courseData.organization,
          price: courseData.price,
          Lecturer: courseData.Lecturer,
        });
      } catch (err) {
        console.error("Error fetching course data:", err);
        setError("Error fetching course data");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  // Update form state when user makes changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form to update course details in the database
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/course/${id}`, course);
      alert("Course updated successfully!");
      navigate("/admin/adminCourse"); // Navigate back to the course list or desired page
    } catch (err) {
      console.error("Error updating course:", err);
      setError("Error updating course");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-white">
        Loading course details...
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Course Name</label>
          <input
            type="text"
            name="courseName"
            value={course.courseName}
            onChange={handleChange}
            className="w-full p-2 rounded text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Course ID</label>
          <input
            type="text"
            name="courseId"
            value={course.courseId}
            onChange={handleChange}
            className="w-full p-2 rounded text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={course.description}
            onChange={handleChange}
            className="w-full p-2 rounded text-white"
            rows={4}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Organization</label>
          <input
            type="text"
            name="organization"
            value={course.organization?.name || ""}
            onChange={handleChange}
            className="w-full p-2 rounded text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Price</label>
          <input
            type="text"
            name="price"
            value={course.price}
            onChange={handleChange}
            className="w-full p-2 rounded text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Lecturer</label>
          <input
            type="text"
            name="Lecturer"
            value={course.Lecturer}
            onChange={handleChange}
            className="w-full p-2 rounded text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditCourse;
