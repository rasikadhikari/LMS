import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import courseImage from "../Images/Course.jpg";
import axios from "../Service/axios";

interface CourseType {
  _id: string;
  courseName: string;
  courseId: string;
  description: string;
  organization: { name: string } | null;
  price: string;
}

function Course() {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

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

  const handleCourseClick = (courseId: string) => {
    navigate(`/courses/${courseId}`);
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
              className="p-6 bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500 border border-gray-700 rounded-lg text-white font-bold shadow-md flex flex-col justify-between "
              onClick={() => handleCourseClick(course._id)}
            >
              <div className="mb-4">
                <p className="inline-block px-3 py-1 rounded-lg bg-yellow-500 text-black font-bold text-sm shadow-md">
                  {course.price}
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
                <button className="border-2 rounded-xl w-20 absolute  scale-105 transition-transform cursor-pointer abs">
                  Enroll
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Course;
