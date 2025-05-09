import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignupPage.css";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/user/signup", {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        // Redirect to login page on successful signup
        navigate("/login");
      }
    } catch (err) {
      console.error("Signup Error:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="signup-container">
      {/* Header */}
      <header className="header">
        <div className="logo">Thryve</div>
        <div className="tagline">Broke? Busy? Thryve Anyway!</div>
        <div className="sign-up-container">
          <Link to="/login" className="sign-up-link">
            LOG IN
          </Link>
          <div className="user-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="8" r="5"></circle>
              <path d="M20 21a8 8 0 1 0-16 0"></path>
            </svg>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="signup-card">
          <h1 className="signup-title">Sign up</h1>
          <p className="existing-user-text">
            Have an Account?{" "}
            <Link to="/login" className="login-link">
              Login
            </Link>
          </p>
          <form className="signup-form" onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Name"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter Password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="form-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="signup-button">
              Signup
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default SignupPage;