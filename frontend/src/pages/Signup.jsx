import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../utils/auth";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSignup = async () => {
    try {
      await signup(email, password);
      navigate("/dashboard");
    } catch {
      alert("Signup failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          onClick={handleSignup}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
        >
          Sign Up
        </button>
        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
