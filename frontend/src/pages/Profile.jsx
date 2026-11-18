import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api, { errMsg } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";

const Profile = () => {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: user.name, phone: user.phone || "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { name: form.name, phone: form.phone };
    if (form.password) body.password = form.password;

    try {
      const res = await api.put(`/user/${user.id}`, body);
      const u = res.data.data;
      updateUser({ id: u._id, name: u.name, email: u.email, phone: u.phone });
      setForm({ ...form, password: "" });
      toast.success("Profile updated");
    } catch (err) {
      toast.error(errMsg(err));
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete your account and all your courts and bookings?")) return;
    try {
      await api.delete(`/user/${user.id}`);
      logout();
      toast.success("Account deleted");
      navigate("/register");
    } catch (err) {
      toast.error(errMsg(err));
    }
  };

  return (
    <div>
      <form className="card form" onSubmit={handleSubmit}>
        <h2>My Profile</h2>
        <p className="muted">{user.email}</p>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <input name="password" type="password" placeholder="New password (leave blank to keep)" value={form.password} onChange={handleChange} minLength={6} />
        <button className="btn" type="submit">Save</button>
      </form>
      <button className="btn btn-danger" onClick={handleDelete}>Delete my account</button>
    </div>
  );
};

export default Profile;
