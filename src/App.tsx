import { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import AdminHeader from "./Layout/AdminHeader";
import { AuthContext, AuthToken, User } from "./Context/AuthContext";

// Lazy-loaded pages
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const Login = lazy(() => import("./Authentication/Login"));
const Signup = lazy(() => import("./Authentication/Signup"));
const Home = lazy(() => import("./Pages/Home"));
const Profile = lazy(() => import("./Pages/User"));
const Course = lazy(() => import("./Pages/CourseDetail"));
const AllCourse = lazy(() => import("./Pages/AllCoursePreview"));
// admin
const AdminCourse = lazy(() => import("./Organization/Course"));
const AdminEnrollment = lazy(() => import("./Organization/Enrollment"));
const AdminLesson = lazy(() => import("./Organization/Lesson"));
const AdminAssignment = lazy(() => import("./Organization/Assignment"));
const AdminSubmission = lazy(() => import("./Organization/Submission"));
// create component
const CreateCourse = lazy(
  () => import("./Module sub-folder/Create/CreateCourse")
);

const Createlesson = lazy(
  () => import("./Module sub-folder/Create/CreateLesson")
);
// Edit component
const EditCourse = lazy(() => import("./Module sub-folder/Edit/EditCourse"));
const EditEnrollment = lazy(
  () => import("./Module sub-folder/Edit/EditEnrollment")
);
const EditLesson = lazy(() => import("./Module sub-folder/Edit/EditLesson"));
const EditAssignment = lazy(
  () => import("./Module sub-folder/Edit/EditAssignment")
);
// view component
const ViewAssignment = lazy(
  () => import("./Module sub-folder/View/ViewAssignment")
);
function App() {
  const savedAuth = localStorage.getItem("auth");
  const initialAuth: AuthToken = savedAuth
    ? JSON.parse(savedAuth)
    : { token: null, user: null };

  const [auth, setAuth] = useState<AuthToken>(initialAuth);

  const changeAuth = (token: string, user: User | null) => {
    const newAuth = { token, user, role: user?.role ?? null };
    setAuth(newAuth);
    localStorage.setItem("auth", JSON.stringify(newAuth));
  };
  return (
    <AuthContext.Provider value={{ auth, user: auth.user, changeAuth }}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthContext.Provider>
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

              <Route path="/courses/:courseId" element={<AllCourse />} />

              <Route path="/admin">
                <Route path="adminCourse" element={<AdminCourse />} />
                <Route path="adminEnrollment" element={<AdminEnrollment />} />
                <Route path="adminLesson" element={<AdminLesson />} />
                <Route path="adminAssignment" element={<AdminAssignment />} />
                <Route path="adminSubmission" element={<AdminSubmission />} />

                {/* Create admin */}
                <Route path="createCourse" Component={CreateCourse} />
                <Route path="createLesson" Component={Createlesson} />

                {/* Edit admin */}
                <Route path="editCourse/:id" Component={EditCourse} />
                <Route path="editEnrollment/:id" Component={EditEnrollment} />
                <Route path="editLesson/:id" Component={EditLesson} />
                <Route path="editAssignment/:id" Component={EditAssignment} />
                {/* view admin*/}
                <Route path="ViewAssignment/:id" Component={ViewAssignment} />
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
