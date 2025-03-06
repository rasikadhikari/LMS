import { useEffect, useState } from "react";
import courseImage from "../Images/Course.jpg";
import axios from "../Service/axios"; // Use your custom axios instance

interface CourseType {
  _id: string;
  courseName: string;
  courseId: string;
  description: string;
  organization: { name: string } | null;
}

function Course() {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get("/course");
        setCourses(response.data.data);
      } catch (err) {
        console.log("Failed to fetch courses", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, []);

  return (
    <div className="app bg-black text-white min-h-screen">
      {/* Hero Section */}
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

      {/* Course Details Box */}
      <div className="grid grid-cols-3 gap-6 p-6">
        {loading ? (
          <p className="col-span-3 text-center">Loading courses...</p>
        ) : (
          courses.map((course) => (
            <div
              key={course._id}
              className="p-6 bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500 border border-gray-700 rounded-lg text-white font-bold shadow-md flex flex-col justify-between hover:scale-105 transition-transform cursor-pointer"
            >
              <div className="mb-4">
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
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Course;
