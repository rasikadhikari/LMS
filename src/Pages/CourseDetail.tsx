import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import courseImage from "../Images/Course.jpg";
import axios from "../Service/axios";
import PayPalButton from "../Layout/PayPalButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CourseType {
  _id: string;
  courseName: string;
  courseId: string;
  description: string;
  organization: { name: string } | null;
  price: string;
}
interface User {
  _id: string;
  role: string;
  name: string;
  email: string;
}

function Course() {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [studentId, setStudentId] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<{
    id: string;
    price: string;
  } | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState<boolean>(false); // Track payment success state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/course");
        setCourses(response.data.data);
      } catch (err) {
        console.log("Failed to fetch courses", err);
        toast.error("Failed to load courses. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get("/user");
        const loggedInUser = response.data.data.find(
          (user: User) => user.email === "test@gmail.com"
        );

        if (loggedInUser) {
          setStudentId(loggedInUser._id);

          // Fetch enrolled courses for this user
          const enrollments = await axios.get(`/enroll/${loggedInUser._id}`);
          const enrolledCourseIds = enrollments.data.map(
            (enrollment: any) => enrollment.course
          );
          setEnrolledCourses(enrolledCourseIds);
        } else {
          toast.error("No logged-in student found.");
        }
      } catch (err) {
        console.log("Failed to fetch users", err);
        toast.error("Failed to fetch user data. Please try again.");
      }
    };

    fetchCourses();
    fetchUsers();
  }, []);

  const EnrollClick = (courseId: string, price: string) => {
    setSelectedCourse({ id: courseId, price });
  };

  const handlePaymentSuccess = async (details: any) => {
    if (details.status === "COMPLETED") {
      console.log("Payment Success", details);
      toast.success("Payment successful! You are now enrolled.");
      if (selectedCourse) {
        try {
          const enrollmentData = {
            student: studentId,
            course: selectedCourse.id,
            progress: 0,
            lessonCompleted: [],
            status: "enrolled",
          };

          await axios.post("/enroll", enrollmentData);

          // Update state to prevent duplicate payments
          setEnrolledCourses((prev) => [...prev, selectedCourse.id]);
          setSelectedCourse(null);
          setIsPaymentSuccess(true);

          navigate(`/courses/${selectedCourse?.id}`);
        } catch (err: any) {
          console.error(
            "Error during enrollment creation:",
            err.response || err
          );
          toast.error("Error during enrollment. Please try again.");
        }
      }
    } else {
      toast.error("Payment processing failed. Please try again.");
    }
  };

  return (
    <div className="app bg-black text-white min-h-screen">
      <section
        className="hero relative flex items-center justify-center h-[400px] bg-gray-900"
        style={{
          backgroundImage: `url(${courseImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "300px",
          width: "100%",
        }}
      >
        <h2 className="text-4xl font-extrabold">Courses</h2>
      </section>

      <div className="grid grid-cols-3 gap-6 p-6">
        {loading ? (
          <p className="col-span-3 text-center">Loading courses...</p>
        ) : (
          courses.map((course) => (
            <div
              key={course._id}
              className="p-6 bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500 border border-gray-700 rounded-lg text-white font-bold shadow-md flex flex-col justify-between"
            >
              <div className="mb-4">
                <p className="inline-block px-3 py-1 rounded-lg bg-yellow-500 text-black font-bold text-sm shadow-md">
                  ${course.price}
                </p>
                <h2 className="text-xl font-semibold">{course.courseName}</h2>
                <p className="text-sm font-medium text-gray-300 mt-2">
                  Course ID: {course.courseId}
                </p>
                <p className="text-xs text-gray-200 mt-2">
                  {course.description}
                </p>
                <p className="text-sm font-light text-gray-400 mt-2">
                  Organized by: {course.organization?.name || "N/A"}
                </p>
                {enrolledCourses.includes(course._id) ? (
                  <button
                    onClick={() => navigate(`/courses/${course._id}`)}
                    className="border-2 rounded-xl w-20 bg-green-600 hover:bg-green-700 p-2 mt-4"
                  >
                    Start
                  </button>
                ) : (
                  <button
                    onClick={() => EnrollClick(course._id, course.price)}
                    className="border-2 rounded-xl w-20 bg-blue-600 hover:bg-blue-700 p-2 mt-4"
                  >
                    Enroll
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Show PayPal payment modal if a course is selected for enrollment */}
      {selectedCourse && !isPaymentSuccess && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4 text-black">
              Proceed to Payment
            </h2>
            <p className="text-black">Course Price: ${selectedCourse.price}</p>
            <PayPalButton
              price={parseFloat(selectedCourse.price)}
              onSuccess={handlePaymentSuccess}
            />
            <button
              onClick={() => setSelectedCourse(null)}
              className="mt-4 p-2 bg-red-600 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Course;
