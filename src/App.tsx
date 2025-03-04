import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import Sidebar from "./Layout/Sidebar";

// Lazy-loaded pages
// const Dashboard = lazy(() => import("./Pages/Dashboard"));
const Login = lazy(() => import("./Authentication/Login"));
const Signup = lazy(() => import("./Authentication/Signup"));

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
        {!isAuthPage && <Sidebar />}
        <div className="flex-grow">
          <Suspense
            fallback={
              <p className="text-center mt-10">Loading...Please wait</p>
            }
          >
            <Routes>
              {/* Student routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </Suspense>
        </div>
      </div>
      {!isAuthPage && <Footer />}
    </>
  );
}

export default App;
