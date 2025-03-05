import React from "react";

const UserProfile = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Student",
    address: "123 Main Street, City, Country",
    contactNumber: "+1234567890",
    enrolledCourses: ["Web Development", "Data Structures"],
    organization: "ABC University",
    createdBy: "Admin",
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-center">
        {/* Profile Picture */}
        <div className="w-32 h-32 rounded-full bg-gray-300 mb-4">
          {/* Placeholder for profile picture */}
        </div>

        {/* User Info */}
        <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
        <p className="text-xl text-gray-600 mb-2">{user.email}</p>
        <p className="text-sm text-gray-500 mb-4">{user.role}</p>

        {/* Address and Contact */}
        {user.address && (
          <div className="w-full mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Address</h3>
            <p className="text-sm text-gray-600">{user.address}</p>
          </div>
        )}

        {user.contactNumber && (
          <div className="w-full mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Contact Number
            </h3>
            <p className="text-sm text-gray-600">{user.contactNumber}</p>
          </div>
        )}

        {/* Enrolled Courses */}
        {user.enrolledCourses.length > 0 && (
          <div className="w-full mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Enrolled Courses
            </h3>
            <ul className="list-disc pl-6">
              {user.enrolledCourses.map((course, index) => (
                <li key={index} className="text-sm text-gray-600">
                  {course}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Organization */}
        {user.organization && (
          <div className="w-full mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Organization
            </h3>
            <p className="text-sm text-gray-600">{user.organization}</p>
          </div>
        )}

        {/* User Created By */}
        {user.createdBy && (
          <div className="w-full mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Created By</h3>
            <p className="text-sm text-gray-600">{user.createdBy}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
