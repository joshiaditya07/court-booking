import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api, { errMsg, SPORTS } from "../api.js";

const empty = { name: "", sport: "futsal", location: "", pricePerHour: "", description: "", isActive: true };

const CourtForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);

  useEffect(() => {
    if (!id) return;
    api
      .get(`/court/${id}`)
      .then((res) => {
        const c = res.data.data;
        setForm({
          name: c.name,
          sport: c.sport,
          location: c.location,
          pricePerHour: c.pricePerHour,
          description: c.description || "",
          isActive: c.isActive,
        });
      })
      .catch((err) => toast.error(errMsg(err)));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/court/${id}`, form);
        toast.success("Court updated");
      } else {
        await api.post("/court", form);
        toast.success("Court added");
      }
      navigate("/my-courts");
    } catch (err) {
      toast.error(errMsg(err));
    }
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>{id ? "Edit court" : "Add a court"}</h2>
      <input name="name" placeholder="Court name" value={form.name} onChange={handleChange} required />
      <select name="sport" value={form.sport} onChange={handleChange}>
        {SPORTS.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
      <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
      <input name="pricePerHour" type="number" min="0" placeholder="Price per hour (NPR)" value={form.pricePerHour} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} rows={3} />
      {id && (
        <label className="checkbox">
          <input name="isActive" type="checkbox" checked={form.isActive} onChange={handleChange} />
          Accepting bookings
        </label>
      )}
      <button className="btn" type="submit">{id ? "Save changes" : "Add court"}</button>
    </form>
  );
};

export default CourtForm;
