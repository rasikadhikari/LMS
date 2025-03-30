import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "../../Service/axios";
import { useNavigate } from "react-router-dom";

function CreateCourse() {
  // State for form data
  const [course, setCourse] = useState({
    courseName: "",
    courseId: "",
    description: "",
    organization: "",
    price: "",
    Lecturer: "",
  });

  // State for available organizations
  const [organizations, setOrganizations] = useState<
    { _id: string; name: string }[]
  >([]);
  const navigate = useNavigate();

  // Fetch users and filter only those with the role "organization"
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get("/user");
        const filteredOrganizations = response.data.data.filter(
          (user: any) => user.role === "Organization"
        );
        setOrganizations(filteredOrganizations);
      } catch (err) {
        console.error("Error fetching organizations:", err);
      }
    };
    fetchOrganizations();
  }, []);

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/course", course);
      alert("Course created successfully!");
      console.log(response.data);
      navigate("/admin/adminCourse"); // Redirect to courses list after creation
    } catch (err) {
      console.error("Error creating course:", err);
      alert("Failed to create course.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Create New Course
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Course Name */}
          <div>
            <label className="block text-gray-700 font-medium">
              Course Name:
            </label>
            <input
              type="text"
              name="courseName"
              value={course.courseName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Course ID */}
          <div>
            <label className="block text-gray-700 font-medium">
              Course ID:
            </label>
            <input
              type="text"
              name="courseId"
              value={course.courseId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium">
              Description:
            </label>
            <textarea
              name="description"
              value={course.description}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            ></textarea>
          </div>

          {/* Organization (Dropdown) */}
          <div>
            <label className="block text-gray-700 font-medium">
              Organization:
            </label>
            <select
              name="organization"
              value={course.organization}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Select Organization</option>
              {organizations.length > 0 ? (
                organizations.map((org) => (
                  <option key={org._id} value={org._id}>
                    {org.name}
                  </option>
                ))
              ) : (
                <option disabled>No organizations available</option>
              )}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 font-medium">Price:</label>
            <input
              type="number"
              name="price"
              value={course.price}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Lecturer */}
          <div>
            <label className="block text-gray-700 font-medium">Lecturer:</label>
            <input
              type="text"
              name="Lecturer"
              value={course.Lecturer}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateCourse;
