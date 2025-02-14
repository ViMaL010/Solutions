import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const loginData = {
        email,
        password,
      };

      // API call to login user
      const response = await axios.post("http://localhost:3000/auth/login", loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const { token, ...userDetails } = response.data;

        // Save user details and JWT to localStorage
        localStorage.setItem("user", JSON.stringify({ ...userDetails, token }));

        alert("Login successful! Redirecting to homepage...");
        navigate("/"); // Redirect to homepage after successful login
      } else {
        setError("Login failed! Please check your credentials.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
        <form onSubmit={handleLogin}>
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
          {loading ? (
            <button
              type="button"
              className="w-full bg-blue-600 text-white p-2 mt-4 rounded opacity-50 cursor-not-allowed"
              disabled
            >
              Logging In...
            </button>
          ) : (
            <button className="w-full bg-blue-600 text-white p-2 mt-4 rounded">Sign In</button>
          )}

          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </form>

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
