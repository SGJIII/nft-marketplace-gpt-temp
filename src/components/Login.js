import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { loggedIn, loginWithMagicLink } = useAuth();

  useEffect(() => {
    if (loggedIn) {
      navigate("/buy-tickets");
    }
  }, [loggedIn, navigate]);

  async function handleLogin(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      await loginWithMagicLink(email);
    } catch (error) {
      console.error("Login failed:", error);
      setError("Failed to log in");
    }

    setIsLoading(false);
  }

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h2 className="mb-4 text-2xl">Log In</h2>
      {error && (
        <div className="bg-red-200 text-red-700 border border-red-400 px-4 py-2 mb-4 rounded">
          {error}
        </div>
      )}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full p-2 text-base border border-gray-300 rounded"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          className={`${
            isLoading ? "bg-blue-300" : "bg-blue-500"
          } text-white font-semibold py-2 px-4 rounded`}
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default Login;
