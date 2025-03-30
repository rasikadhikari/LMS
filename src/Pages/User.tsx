import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "../Service/axios";
import { toast } from "react-toastify"; // Import the toast function
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const UserProfile = () => {
  const { auth } = useContext(AuthContext) || {};
  console.log(auth);

  const [userDetails, setUserDetails] = useState<any>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (auth?.user) {
        try {
          const response = await axios.get("/user");
          console.log("API Response:", response);

          const user = response.data.data.find(
            (u: any) => u._id === auth?.user?._id
          );

          console.log("User Found:", user);
          setUserDetails(user);

          // Success toast message
          toast.success("User details loaded successfully!");
        } catch (error) {
          console.error("Error fetching user details:", error);
          // Error toast message
          toast.error("Failed to load user details.");
        }
      }
    };

    fetchUserDetails();
  }, [auth?.user?._id]);

  if (!userDetails) {
    return <p className="text-center text-gray-600">Loading user details...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-center">
        {/* Profile Picture Placeholder */}
        <div className="w-32 h-32 rounded-full bg-gray-300 mb-4"></div>

        {/* User Info */}
        <h2 className="text-3xl font-bold text-gray-800">{userDetails.name}</h2>
        <p className="text-xl text-gray-600 mb-2">{userDetails.email}</p>
        <p className="text-sm text-gray-500 mb-4">{userDetails.role}</p>

        {/* Address and Contact */}
        {userDetails.address && (
          <div className="w-full mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Address</h3>
            <p className="text-sm text-gray-600">{userDetails.address}</p>
          </div>
        )}

        {userDetails.contactNumber && (
          <div className="w-full mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Contact Number
            </h3>
            <p className="text-sm text-gray-600">{userDetails.contactNumber}</p>
          </div>
        )}

        {/* Enrolled Courses */}
        {userDetails.enrolledCourses?.length > 0 && (
          <div className="w-full mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Enrolled Courses
            </h3>
            <ul className="list-disc pl-6">
              {userDetails.enrolledCourses.map(
                (course: string, index: number) => (
                  <li key={index} className="text-sm text-gray-600">
                    {course}
                  </li>
                )
              )}
            </ul>
          </div>
        )}

        {/* Organization (Fetch organization name if available) */}
        {userDetails.organization && (
          <div className="w-full mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Organization
            </h3>
            <p className="text-sm text-gray-600">{userDetails.organization}</p>
          </div>
        )}

        {/* User Created By */}
        {userDetails.createdBy && (
          <div className="w-full mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Created By</h3>
            <p className="text-sm text-gray-600">{userDetails.createdBy}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
