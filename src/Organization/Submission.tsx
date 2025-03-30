import { useEffect, useState } from "react";
import axios from "../Service/axios";
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
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get("/submission");
        console.log("API Response:", response.data); // Debugging log

        if (!Array.isArray(response.data)) {
          console.error("Invalid API response format:", response.data);
          return;
        }

        setSubmissions(response.data);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const handleDelete = (id: string) => {
    console.log("Delete submission with ID:", id);
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
            <th className="px-4 py-2 text-left">Student</th>
            <th className="px-4 py-2 text-left">Assignment</th>
            <th className="px-4 py-2 text-left">Answer</th>
            <th className="px-4 py-2 text-left">Files</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission._id} className="border-b border-gray-700">
              <td className="px-4 py-2">{submission.student?.name}</td>
              <td className="px-4 py-2">{submission.assignment}</td>
              <td className="px-4 py-2">
                {submission.answer.substring(0 - 10)}
              </td>
              <td className="px-4 py-2">
                {submission.files.length > 0
                  ? submission.files.map((file, index) => (
                      <div key={index}>
                        <a
                          href={file}
                          className="text-blue-500"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          File {index + 1}
                        </a>
                      </div>
                    ))
                  : "No files"}
              </td>
              <td className="px-4 py-2">
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
