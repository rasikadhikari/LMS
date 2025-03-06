const AdminHeader = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <h1 className="text-xl">Admin Dashboard</h1>
      <nav>
        <a href="/admin/adminCourse" className="mr-4">
          Courses
        </a>
        <a href="/admin/adminEnrollment" className="mr-4">
          Enrollments
        </a>
        <a href="/admin/adminLesson">Lessons</a>
      </nav>
    </header>
  );
};

export default AdminHeader;
