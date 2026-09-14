import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    try {
      setError("");
      const res = await api.post("/auth/login", form);
      onLogin(res.data.user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
      <h1>QuizCraft</h1>
        <label>Email</label>
        <input name="email" value={form.email} onChange={change} placeholder="you@test.com" />

        <label>Password</label>
        <input name="password" type="password" value={form.password} onChange={change} placeholder="••••••••" />

        {error && <div className="error">{error}</div>}

        <button className="btn" onClick={submit}>Login</button>
        <p className="muted center-text">
          No account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
