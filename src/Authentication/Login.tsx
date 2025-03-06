import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../Service/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/user/login", {
        email,
        password,
      });

      console.log(response.data);

      if (response.data && response.data.success) {
        toast.success("Login successful! Redirecting...");
        setTimeout(() => navigate("/home"), 2000);
      } else {
        toast.error(response.data.message || "Login failed");
      }
      console.log(response.data.message);
    } catch (error: any) {
      console.error("Error during login:", error);
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-pokemon-yellow to-pokemon-blue">
      <ToastContainer />
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-3xl font-bold text-pokemon-blue">Login to LMS</h1>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-pokemon-blue focus:border-pokemon-blue"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-pokemon-blue focus:border-pokemon-blue"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-pokemon-yellow text-pokemon-blue font-bold rounded-md hover:bg-yellow-400 focus:ring-2 focus:ring-yellow-300"
          >
            Login
          </button>
        </form>

        <Link
          to="/signup"
          className="block text-center mt-4 text-sm text-pokemon-blue hover:underline"
        >
          Don’t have an account? Click Here
        </Link>
      </div>
    </div>
  );
};

export default Login;
