import { Link } from "react-router-dom";
import axios from "../Service/axios";
import { useEffect, useState } from "react";

function Home() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/course");
        setCourses(response.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Welcome Section */}
      <section className="text-center py-20 bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
        <h2 className="text-4xl font-semibold mb-4">
          Welcome to the Learning Management System
        </h2>
        <p className="text-xl mb-8">
          Explore a wide range of courses and start learning today!
        </p>
        <Link
          to="/course"
          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-white font-bold rounded-md"
        >
          Browse Courses
        </Link>
      </section>

      {/* Course List */}
      <section className="container mx-auto py-16">
        <h2 className="text-3xl text-center font-bold mb-8">
          Available Courses
        </h2>

        {loading ? (
          <p className="text-center">Loading courses...</p>
        ) : (
          <div className="grid grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course._id}
                className="p-4 border rounded-lg shadow-md bg-white flex flex-col justify-between"
              >
                <div>
                  <h1 className="text-2xl font-bold text-blue-500 capitalize">
                    {course.courseName}
                  </h1>

                  <p className="text-gray-600 mt-1 text-sm">
                    {course.description.substring(0, 100)}...
                  </p>
                </div>
                <div className="mt-4 text-center">
                  <Link
                    to="/course"
                    className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                  >
                    View More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
