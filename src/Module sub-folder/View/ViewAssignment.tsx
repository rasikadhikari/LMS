import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../Service/axios";

interface Submission {
  _id: string;
  student: { name: string };
  assignment: string;
  files: string[];
  answer: string;
}

const SubmissionViewPage = () => {
  const { id } = useParams();
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissionById();
  }, [id]);

  const fetchSubmissionById = async () => {
    try {
      const response = await axios.get(`/submission/${id}`);
      setSubmission(response.data);
      toast.success("Submission details loaded successfully!");
    } catch (error) {
      console.error("Error fetching submission:", error);
      toast.error("Failed to load submission details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading submission details...</div>;
  }

  if (!submission) {
    return <div className="p-6 text-center">Submission not found.</div>;
  }

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <h2 className="text-4xl font-extrabold mb-4">Submission Details</h2>

      {/* Wrapper box for the submission details */}
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg mb-6">
        <div className="mb-4">
          <strong>Submitted By:</strong> {submission.student?.name || "N/A"}
        </div>
        <div className="mb-4">
          <strong>Assignment ID:</strong> {submission.assignment || "N/A"}
        </div>
        <div className="mb-4">
          <strong>Answer:</strong>
          <div>{submission.answer}</div>
        </div>
        <div className="mb-4">
          <strong>Files:</strong>
          {submission.files.length > 0 ? (
            submission.files.map((file, index) => (
              <div key={index} className="mb-2">
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
          ) : (
            <p>No files uploaded</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmissionViewPage;
