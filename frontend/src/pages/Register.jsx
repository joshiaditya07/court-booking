import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api, { errMsg } from "../api.js";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      toast.success("Account created");
      navigate("/login", { replace: true });
    } catch (err) {
      toast.error(errMsg(err));
    }
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input name="name" placeholder="Full name" value={form.name} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
      <input name="password" type="password" placeholder="Password (min 6 characters)" value={form.password} onChange={handleChange} required minLength={6} />
      <button className="btn" type="submit">Create account</button>
      <p>Already registered? <Link to="/login">Login</Link></p>
    </form>
  );
};

export default Register;
