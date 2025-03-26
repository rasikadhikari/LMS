import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../Service/axios";
import VideoPlayer from "../Component/VideoPlayer";

interface CourseType {
  _id: string;
  courseName: string;
  courseId: string;
  description: string;
  organization: { name: string } | null;
}

interface LessonType {
  _id: string;
  title: string;
  content: string;
  courseId: { _id: string; courseName: string };
  resourceMaterial: { type: string; url: string }[];
}

interface AssignmentType {
  _id: string;
  title: string;
  question: string;
  description: string;
  courseId: string;
}

interface SubmissionType {
  _id: string;
  student: string;
  assignment: string;
  answer: string;
  files: string[];
}

function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();

  const [course, setCourse] = useState<CourseType | null>(null);
  const [lessons, setLessons] = useState<LessonType[]>([]);
  const [assignments, setAssignments] = useState<AssignmentType[]>([]);
  const [submissions, setSubmissions] = useState<SubmissionType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // Fetch Course Details
        const courseResponse = await axios.get(`/course/${courseId}`);
        setCourse(courseResponse.data.data);

        // Fetch Lessons
        const lessonsResponse = await axios.get(`/lesson`);
        const filteredLessons = lessonsResponse.data.data.filter(
          (lesson: LessonType) => lesson.courseId._id === courseId
        );
        setLessons(filteredLessons);

        // Fetch Assignments
        const assignmentsResponse = await axios.get(`/assignment`);
        console.log("assignment---", assignmentsResponse.data);
        const filteredAssignments = assignmentsResponse.data.filter(
          (assignment: { course: string }) => assignment.course === courseId
        );
        console.log("filter-----", filteredAssignments);
        setAssignments(filteredAssignments);
        console.log("Assignment courseId structure:", assignmentsResponse.data);

        // Fetch Submissions
        const submissionResponse = await axios.get(`/submission`);
        setSubmissions(submissionResponse.data);
      } catch (err) {
        console.log("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [courseId]);

  if (loading)
    return <p className="text-center mt-10">Loading Course Details...</p>;

  if (!course) return <p className="text-center mt-10">Course not found.</p>;

  // Handle expand/collapse for lessons
  const toggleLesson = (lessonId: string) => {
    setExpandedLesson((prev) => (prev === lessonId ? null : lessonId));
  };

  return (
    <div className="p-8 bg-black text-white min-h-screen">
      {/* Course Info */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{course.courseName}</h1>
        <p className="mt-2 text-gray-300">Course ID: {course.courseId}</p>
        <p className="mt-2">{course.description}</p>
        <p className="mt-2 text-gray-400">
          Organized by: {course.organization?.name || "N/A"}
        </p>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left - Lessons List */}
        <div className="col-span-2 bg-gray-900 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Lessons</h2>
          {lessons.length === 0 ? (
            <p>No lessons found for this course.</p>
          ) : (
            <div className="space-y-3">
              {lessons.map((lesson) => (
                <div
                  key={lesson._id}
                  className="bg-gray-800 rounded-lg p-3 cursor-pointer"
                >
                  <div
                    className="flex justify-between items-center"
                    onClick={() => toggleLesson(lesson._id)}
                  >
                    <p className="font-semibold">{lesson.title}</p>
                    <span>{expandedLesson === lesson._id ? "▲" : "▼"}</span>
                  </div>

                  {expandedLesson === lesson._id && (
                    <div className="mt-2 text-gray-400">
                      <p>{lesson.content}</p>
                      {lesson.resourceMaterial.length > 0 && (
                        <div className="mt-2">
                          <p className="font-semibold">Resources:</p>
                          <ul className="list-disc pl-5">
                            {lesson.resourceMaterial.map((resource) => (
                              <li key={resource.url}>
                                <a
                                  href={resource.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:underline"
                                >
                                  {resource.type.toUpperCase()} File
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Demo Video Section */}
        <div className="bg-gray-900 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Demo Video</h2>
          <VideoPlayer />
        </div>

        {/* Assignments Section */}
        <div className="bg-gray-900 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Assignments</h2>
          {assignments.length === 0 ? (
            <p>No assignments available for this course.</p>
          ) : (
            <div className="space-y-3">
              {assignments.map((assignment) => {
                const submission = submissions.find(
                  (sub) => sub.assignment === assignment._id
                );

                return (
                  <div
                    key={assignment._id}
                    className="bg-gray-800 p-4 rounded-lg"
                  >
                    <h3 className="text-lg font-semibold">
                      {assignment.title}
                    </h3>
                    <p className="text-gray-400">{assignment.description}</p>

                    {submission ? (
                      <div className="mt-2">
                        <p className="text-green-400 font-semibold">
                          Submitted:
                        </p>
                        <p className="text-gray-400">{assignment.question}</p>
                        <p className="text-gray-300">{submission.answer}</p>
                        {submission.files.length > 0 && (
                          <div className="mt-2">
                            <p className="font-semibold">Uploaded Files:</p>
                            <ul className="list-disc pl-5">
                              {submission.files.map((file, index) => (
                                <li key={index}>
                                  <a
                                    href={file}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:underline"
                                  >
                                    File {index + 1}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-red-400">No submission yet.</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
