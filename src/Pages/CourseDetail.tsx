import course from "../Images/Course.jpg";

function Course() {
  const courses = [
    {
      id: 1,
      name: "Web Development",
      description: "this the Web development class",
      organization: "Nami college",
    },
    { id: 2, name: "Data Science" },
    { id: 3, name: "UI/UX Design" },
    { id: 4, name: "Cyber Security" },
    { id: 5, name: "Digital Marketing" },
    { id: 6, name: "Cloud Computing" },
  ];
  return (
    <div className="app bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section
        className="hero relative flex items-center justify-center h-[400px] bg-gray-900"
        style={{
          backgroundImage: `url(${course})`, // Fixed typo here (extra `}` removed)
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
        {courses.map((course) => (
          <button
            key={course.id}
            className="p-6 bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500 border border-gray-700 rounded-lg text-white font-bold cursor-pointer transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500 hover:shadow-lg hover:ring-2 hover:ring-gray-300 text-center text-sm shadow-md"
          >
            <h2 className="text-xl font-semibold mb-2">{course.name}</h2>
            <p className="text-sm font-medium text-gray-300">{course.id}</p>
            <p className="text-xs text-gray-200 mb-4">{course.description}</p>
            <p className="text-sm font-light text-gray-600">
              Organized by :{course.organization}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Course;
