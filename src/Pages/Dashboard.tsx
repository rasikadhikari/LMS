import background from "../Images/kettering-university-learning-commons-208792.jpg";
import graduation from "../Images/Graduation.jpg";
import { Book1, ShieldTick, Teacher, UserSquare } from "iconsax-react";

function App() {
  return (
    <div className="app bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section
        className="hero relative flex items-center justify-center h-[400px] bg-gray-900"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "300px",
          width: "100%",
        }}
      >
        <h2 className="text-4xl font-extrabold">
          The Dedication to Build the Future
        </h2>
      </section>
      <div className="features grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-800">
        <FeatureBox title="Why Study at LMS" Icon={Book1} />
        <FeatureBox title="Certification Guarantee" Icon={ShieldTick} />
        <FeatureBox title="Graduate Admission" Icon={Teacher} />
        <FeatureBox title="Skilled Lecturers" Icon={UserSquare} />
      </div>

      {/* About Section */}
      <section className="about grid grid-cols-2 gap-6 p-6 bg-black">
        <div className="bg-gray-700 p-4 rounded">
          <img
            src={graduation}
            alt="Campus"
            className="w-full h-auto rounded"
          />
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-4">
            We create unique digital media experiences.
          </h3>
          <p className="text-gray-400">
            At LMS, we focus on modern education and practical learning.
          </p>
          <div className="mt-4 space-y-2">
            <p className="font-bold">Our Mission</p>
            <p className="text-gray-400">
              Provide cutting-edge learning experiences to all students.
            </p>
            <p className="font-bold">Our Vision</p>
            <p className="text-gray-400">
              Shape future leaders through innovative education.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
function FeatureBox({
  title,
  Icon,
}: {
  title: string;
  Icon: React.ElementType;
}) {
  return (
    <div className="p-4 border border-gray-700 bg-gray-900 rounded-lg text-center">
      <Icon size="32" color="white" className="mx-auto mb-2" />
      <h4 className="font-bold text-white">{title}</h4>
      <p className="text-gray-400 mt-2">
        Some brief description about this feature.
      </p>
    </div>
  );
}

export default App;
