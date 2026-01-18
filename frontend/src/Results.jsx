import { useLocation, useNavigate } from "react-router-dom";

export default function Results() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.evaluation) {
    return <div>No evaluation found</div>;
  }

  const { hire_probability, strengths, weaknesses, final_verdict } =
    state.evaluation;

  return (
    <div className="min-h-screen bg-[#EAE7DE] p-12">
      <h1 className="text-5xl font-serif mb-6">Interview Results</h1>

      <p className="text-xl mb-8">
        Hire Probability: <b>{Math.round(hire_probability * 100)}%</b>
      </p>

      <h2 className="text-2xl font-bold mb-2">Strengths</h2>
      <ul className="mb-6">
        {strengths.map((s, i) => <li key={i}>• {s}</li>)}
      </ul>

      <h2 className="text-2xl font-bold mb-2">Weaknesses</h2>
      <ul className="mb-6">
        {weaknesses.map((w, i) => <li key={i}>• {w}</li>)}
      </ul>

      <p className="text-lg font-bold mb-8">{final_verdict}</p>

      <button
        onClick={() => navigate("/dashboard")}
        className="px-8 py-4 bg-black text-white rounded-full"
      >
        Back to Dashboard
      </button>
    </div>
  );
}
