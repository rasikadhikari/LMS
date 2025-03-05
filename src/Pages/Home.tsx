import React from "react";

const courses = [
  {
    id: 1,
    name: "Introduction to Computer Science",
    description: "Learn the basics of computer science.",
  },
  {
    id: 2,
    name: "Web Development Bootcamp",
    description: "Learn full-stack web development.",
  },
  {
    id: 3,
    name: "Data Structures and Algorithms",
    description: "Master data structures and algorithms.",
  },
];

function App() {
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
        <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-white font-bold rounded-md">
          Browse Courses
        </button>
      </section>

      {/* Course List */}
      <section className="container mx-auto py-16">
        <h2 className="text-3xl text-center font-bold mb-8">
          Available Courses
        </h2>
        <div className="grid grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white border border-gray-300 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">{course.name}</h3>
              <p className="text-sm text-gray-600">{course.description}</p>
              <button className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-md">
                View Course
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
