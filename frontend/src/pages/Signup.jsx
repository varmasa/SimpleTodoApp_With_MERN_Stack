import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "../styles/Auth.css";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const signup = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/auth/signup",
        form
      );

      console.log(res.data);

      alert("Signup Successful");

      navigate("/");
    } catch (err) {
      console.log("Signup Error:", err);
      console.log("Response:", err.response?.data);

      alert(
        err.response?.data?.message ||
        "Signup Failed"
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2 className="auth-title">
          Create Account 🚀
        </h2>

        <form onSubmit={signup}>

          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="btn-primary"
            type="submit"
          >
            Sign Up
          </button>

        </form>

        <div className="auth-footer">
          Already have an account?{" "}
          <Link to="/">
            Login
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Signup;