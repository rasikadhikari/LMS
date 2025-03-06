import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import AdminHeader from "./Layout/AdminHeader";

// Lazy-loaded pages
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const Login = lazy(() => import("./Authentication/Login"));
const Signup = lazy(() => import("./Authentication/Signup"));
const Home = lazy(() => import("./Pages/Home"));
const Profile = lazy(() => import("./Pages/User"));
const Course = lazy(() => import("./Pages/CourseDetail"));
const LessonDetail = lazy(() => import("./Pages/LessonDetail"));
const EnrollmentDetail = lazy(() => import("./Pages/EnrollmentDetail"));

// admin
const AdminCourse = lazy(() => import("./Organization/Course"));
const AdminEnrollment = lazy(() => import("./Organization/Enrollment"));
const AdminLesson = lazy(() => import("./Organization/Lesson"));

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

  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAuthPage && (isAdminPage ? <AdminHeader /> : <Header />)}
      <div className="flex">
        <div className="flex-grow">
          <Suspense
            fallback={
              <p className="text-center mt-10">Loading...Please wait</p>
            }
          >
            <Routes>
              <Route path="/" element={<Dashboard />}></Route>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/course" element={<Course />} />
              <Route path="/lesson" element={<LessonDetail />} />
              <Route path="/enrollment" element={<EnrollmentDetail />} />

              <Route path="/admin">
                <Route path="adminCourse" element={<AdminCourse />} />
                <Route path="adminEnrollment" element={<AdminEnrollment />} />
                <Route path="adminLesson" element={<AdminLesson />} />
              </Route>
            </Routes>
          </Suspense>
        </div>
      </div>
      {!isAuthPage && <Footer />}
    </>
  );
}

export default App;
