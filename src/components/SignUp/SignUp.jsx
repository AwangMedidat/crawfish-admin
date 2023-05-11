import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [banyakKolam, setBanyakKolam] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("username ", username);
    console.log("email ", email);
    console.log("password ", password);
    navigate("/signin");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="SignGlass">
      <div className="signin-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Masukkan username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="Masukkan email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="password-visibility-button"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <label>Banyak Kolam</label>
          <input
            type="number"
            placeholder="Masukkan banyak kolam"
            onChange={(e) => setBanyakKolam(e.target.value)}
          />
          <button type="submit">Sign Up</button>
        </form>
        {/* <div className="signup-link">
          <p>Belum punya akun?</p>
          <a href="/signup">Daftar</a>
        </div> */}
      </div>
    </div>
  );
}

export default SignUp;
