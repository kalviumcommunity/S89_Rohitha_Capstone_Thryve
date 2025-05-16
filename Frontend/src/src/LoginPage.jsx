import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/user/login", {
        email,
        password,
      });

      if (response.status === 200) {
        // Successful login
        alert("Login successful!");
        navigate("/dashboard"); // Change this to your actual home/dashboard path
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Invalid email or password");
      }
    }
  };

  return (
    <div className="login-container">
      <header className="header">
        <div className="logo">Thryve</div>
        <div className="tagline">Broke? Busy? Thryve Anyway!</div>
        <div className="sign-up-container">
          <Link to="/signup" className="sign-up-link">SIGN UP</Link>
          <div className="user-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="5"></circle>
              <path d="M20 21a8 8 0 1 0-16 0"></path>
            </svg>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="login-card">
          <h1 className="login-title">Log in</h1>
          <p className="new-user-text">
            New to THRYVE?{" "}
            <Link to="/signup" className="signup-link">
              Sign up
            </Link>
          </p>
          <form className="login-form" onSubmit={handleLogin}>
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
              placeholder="Password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="login-button">
              Login Now
            </button>
            <div className="forgot-password">
              Forgot password?{" "}
              <Link to="/forgot-password" className="forgot-link">
                Click here
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
