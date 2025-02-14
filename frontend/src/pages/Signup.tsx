import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userData = {
        email,
        password,
        isAdmin: isAdmin ? true : false, // Sending a boolean value
      };

      // API call to register user
      const response = await axios.post("http://localhost:3000/auth/signup", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

        const { token, ...userDetails } = response.data;

        // Save user details and JWT to localStorage
        localStorage.setItem("user", JSON.stringify({ ...userDetails, token }));

        alert(`Signup successful as ${isAdmin ? "Admin" : "User"}! Redirecting to login...`);
        navigate("/login"); // Redirect to the login page after successful signup
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-3 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-3 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="admin"
              className="mr-2"
              checked={isAdmin}
              onChange={() => setIsAdmin(!isAdmin)}
            />
            <label htmlFor="admin" className="text-gray-700">Sign up as Admin</label>
          </div>

          {loading ? (
            <button
              type="button"
              className="w-full bg-blue-600 text-white p-2 mt-4 rounded opacity-50 cursor-not-allowed"
              disabled
            >
              Signing Up...
            </button>
          ) : (
            <button className="w-full bg-blue-600 text-white p-2 mt-4 rounded">Sign Up</button>
          )}

          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </form>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
