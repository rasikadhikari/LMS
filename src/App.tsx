import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";

// Lazy-loaded pages
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const Login = lazy(() => import("./Authentication/Login"));
const Signup = lazy(() => import("./Authentication/Signup"));
const Home = lazy(() => import("./Pages/Home"));
const Profile = lazy(() => import("./Pages/User"));
const Course = lazy(() => import("./Pages/Course"));
const Lesson = lazy(() => import("./Pages/Lesson"));
const Enrollment = lazy(() => import("./Pages/Enrollment"));

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      <Header />
      <div className="flex">
        <div className="flex-grow">
          <Suspense
            fallback={
              <p className="text-center mt-10">Loading...Please wait</p>
            }
          >
            <Routes>
              <Route path="/" element={<Dashboard />}></Route>
              {/* Student routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/course" element={<Course />} />
              <Route path="/lesson" element={<Lesson />} />
              <Route path="/enrollment" element={<Enrollment />} />
            </Routes>
          </Suspense>
        </div>
      </div>
      {!isAuthPage && <Footer />}
    </>
  );
}

export default App;
