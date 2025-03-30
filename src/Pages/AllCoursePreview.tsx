import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../Service/axios";
import VideoPlayer from "../Component/VideoPlayer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CourseType {
  _id: string;
  courseName: string;
  courseId: string;
  description: string;
  organization: { name: string } | null;
  Lecturer: string;
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
  course: string;
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
        const courseResponse = await axios.get(`/course/${courseId}`);
        setCourse(courseResponse.data.data);

        const lessonsResponse = await axios.get(`/lesson`);
        const filteredLessons = lessonsResponse.data.data.filter(
          (lesson: LessonType) => lesson.courseId._id === courseId
        );
        setLessons(filteredLessons);

        const assignmentsResponse = await axios.get(`/assignment`);
        const filteredAssignments = assignmentsResponse.data.filter(
          (assignment: { course: string }) => assignment.course === courseId
        );
        setAssignments(filteredAssignments);

        const submissionResponse = await axios.get(`/submission`);
        setSubmissions(submissionResponse.data);
      } catch (err) {
        console.log("Failed to fetch data", err);
        toast.error("Failed to load course data.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [courseId]);

  if (loading)
    return <p className="text-center mt-10">Loading Course Details...</p>;

  if (!course) return <p className="text-center mt-10">Course not found.</p>;

  const toggleLesson = (lessonId: string) => {
    setExpandedLesson((prev) => (prev === lessonId ? null : lessonId));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    assignmentId: string
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const answer = formData.get("answer") as string;

    if (!answer.trim()) {
      toast.error("Answer cannot be empty.");
      return;
    }

    try {
      const response = await axios.post("/submission", {
        assignment: assignmentId,
        answer: answer,
      });

      if (response.status === 201) {
        toast.success("Assignment submitted successfully!");
        setSubmissions([...submissions, response.data]);
      } else {
        toast.error("Failed to submit assignment.");
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div className="p-8 bg-black text-white min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{course.courseName}</h1>
        <p className="mt-2 text-gray-300">Course ID: {course.courseId}</p>
        <p className="mt-2">{course.description}</p>
        <p className="mt-2 text-gray-400">
          Organized by: {course.organization?.name || "N/A"}
        </p>
        <p className="mt-2 text-blue-400 text-bold font-bold">
          Head Lecturer: {course.Lecturer}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

        <div className="bg-gray-900 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Demo Video</h2>
          <VideoPlayer />
        </div>

        <div className="bg-gray-900 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Assignments</h2>

          <h3 className="text-lg font-semibold text-green-400 mb-2">
            Submitted Assignments
          </h3>
          {assignments.filter((a) =>
            submissions.some((s) => s.assignment === a._id)
          ).length === 0 ? (
            <p className="text-gray-400">
              No assignments have been submitted yet.
            </p>
          ) : (
            <div className="space-y-3">
              {assignments
                .filter((a) => submissions.some((s) => s.assignment === a._id))
                .map((assignment) => {
                  const submission = submissions.find(
                    (sub) => sub.assignment === assignment._id
                  );
                  return (
                    <div
                      key={assignment._id}
                      className="bg-gray-800 p-4 rounded-lg"
                    >
                      <h3 className="text-lg font-semibold">
                        {assignment.question}
                      </h3>
                      <p className="text-gray-400">{assignment.course}</p>
                      <p className="text-green-400 font-semibold">Submitted:</p>
                      <p className="text-gray-300">{submission?.answer}</p>
                    </div>
                  );
                })}
            </div>
          )}

          <h3 className="text-lg font-semibold text-red-400 mt-6 mb-2">
            Pending Assignments
          </h3>
          {assignments.filter(
            (a) => !submissions.some((s) => s.assignment === a._id)
          ).length === 0 ? (
            <p className="text-gray-400">No pending assignments.</p>
          ) : (
            <div className="space-y-3">
              {assignments
                .filter((a) => !submissions.some((s) => s.assignment === a._id))
                .map((assignment) => (
                  <form
                    key={assignment._id}
                    onSubmit={(e) => handleSubmit(e, assignment._id)}
                    className="bg-gray-800 p-4 rounded-lg"
                  >
                    <h3 className="text-lg font-semibold">
                      {assignment.question}
                    </h3>
                    <textarea
                      name="answer"
                      className="w-full p-2 bg-gray-700 rounded-lg text-white"
                      required
                    />
                    <button
                      type="submit"
                      className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                      Submit Answer
                    </button>
                  </form>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
