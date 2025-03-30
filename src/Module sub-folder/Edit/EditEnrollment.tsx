import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "../../Service/axios";
import { useNavigate, useParams } from "react-router-dom";

function EditEnrollment() {
  interface EnrollmentData {
    student: { name: string } | null;
    course: { courseName: string } | null;
    status: string;
  }
  const navigate = useNavigate();
  const { id } = useParams();
  const [enroll, setEnroll] = useState<EnrollmentData>({
    student: { name: "" },
    course: { courseName: "" },
    status: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getEnrollment = async () => {
      try {
        const response = await axios.get(`/enroll/${id}`);
        const enroll = response.data.data;
        console.log("enroll-------", enroll);
        setEnroll({
          student: enroll.student || { name: "" },
          course: enroll.course || { courseName: "" },
          status: enroll.status,
        });
      } catch (err) {
        console.error("Error fetching enrollment data:", err);
        setError("Failed to load enrollment details.");
      } finally {
        setLoading(false);
      }
    };

    getEnrollment();
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEnroll((prevEnroll) => {
      if (name === "status") {
        return { ...prevEnroll, status: value };
      } else if (name === "studentName") {
        return {
          ...prevEnroll,
          student: { ...prevEnroll.student, name: value },
        };
      } else if (name === "courseName") {
        return {
          ...prevEnroll,
          course: { ...prevEnroll.course, courseName: value },
        };
      }
      return prevEnroll;
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/enroll/${id}`, enroll);
      alert("Enrollment updated successfully");
      navigate("/admin/adminEnrollment");
      console.log(response);
    } catch (err) {
      console.error("Error updating enrollment data:", err);
      setError("Error updating enrollment data");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Edit Enrollment
        </h1>

        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Student Field */}
            <div>
              <label
                htmlFor="student"
                className="block text-gray-700 font-medium"
              >
                Student Name:
              </label>
              <input
                type="text"
                id="student"
                name="studentName"
                value={enroll.student?.name || ""}
                onChange={handleChange}
                className="font-black w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Course Field */}
            <div>
              <label
                htmlFor="course"
                className="block text-gray-700 font-medium"
              >
                Course Name:
              </label>
              <input
                type="text"
                id="course"
                name="courseName"
                value={enroll.course?.courseName || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Status Field */}
            <div>
              <label
                htmlFor="status"
                className="block text-gray-700 font-medium"
              >
                Enrollment Status:
              </label>
              <input
                type="text"
                id="status"
                name="status"
                value={enroll.status}
                disabled
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              Update Enrollment
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default EditEnrollment;
