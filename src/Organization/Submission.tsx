import { useEffect, useState } from "react";
import axios from "../Service/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

interface Submission {
  _id: string;
  student: { name: string };
  assignment: string;
  files: string[];
  answer: string;
}

const SubmissionTable = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await axios.get("/submission");
      setSubmissions(response.data);
      toast.success("Submissions loaded successfully!");
    } catch (error) {
      console.error("Error fetching submissions:", error);
      toast.error("Failed to load submissions.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this submission?")) {
      return;
    }

    try {
      await axios.delete(`/submission/${id}`);
      setSubmissions(submissions.filter((submission) => submission._id !== id));
      toast.success("Submission deleted successfully!");
      console.log("Submission deleted successfully.");
    } catch (error) {
      console.error("Error deleting submission:", error);
      toast.error("Failed to delete submission.");
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading submissions...</div>;
  }

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <h2 className="text-4xl font-extrabold mb-4">Submission List</h2>
      <table className="min-w-full table-auto bg-gray-800 rounded-lg shadow-lg">
        <thead className="bg-black">
          <tr>
            <th className="px-4 py-2 text-left">Submitted By</th>
            <th className="px-4 py-2 text-left">Assignment Id</th>
            <th className="px-4 py-2 text-left">Answer</th>
            <th className="px-4 py-2 text-left">Files</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission._id} className="border-b border-gray-700">
              <td className="px-4 py-2">{submission.student?.name || "N/A"}</td>
              <td className="px-4 py-2">{submission.assignment || "N/A"}</td>
              <td className="px-4 py-2">
                {submission.answer.length > 30
                  ? submission.answer.substring(0, 30) + "..."
                  : submission.answer}
              </td>
              <td className="px-4 py-2">
                {submission.files.length > 0
                  ? submission.files.map((file, index) => (
                      <div key={index}>
                        <a
                          href={file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          File {index + 1}
                        </a>
                      </div>
                    ))
                  : "No files"}
              </td>
              <td className="px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
                  onClick={() =>
                    navigate(`/admin/ViewAssignment/${submission._id}`)
                  } // Navigate to the View page
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(submission._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionTable;
