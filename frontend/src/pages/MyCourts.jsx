import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api, { errMsg } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";

const MyCourts = () => {
  const { user } = useAuth();
  const [courts, setCourts] = useState([]);

  const loadCourts = useCallback(() => {
    api
      .get("/court", { params: { owner: user.id } })
      .then((res) => setCourts(res.data.data))
      .catch((err) => toast.error(errMsg(err)));
  }, [user.id]);

  useEffect(() => {
    loadCourts();
  }, [loadCourts]);

  const deleteCourt = async (courtId) => {
    if (!window.confirm("Delete this court and all its bookings?")) return;
    try {
      await api.delete(`/court/${courtId}`);
      toast.success("Court deleted");
      loadCourts();
    } catch (err) {
      toast.error(errMsg(err));
    }
  };

  return (
    <div>
      <h2>My Courts</h2>
      {courts.length === 0 && <p>You have not added any courts yet. <Link to="/add-court">Add one</Link></p>}

      {courts.map((court) => (
        <div className="card" key={court._id}>
          <h3>{court.name} <span className="tag">{court.sport}</span></h3>
          <p>{court.location} - NPR {court.pricePerHour}/hour {!court.isActive && "(paused)"}</p>
          <div className="row">
            <Link className="btn btn-small" to={`/edit-court/${court._id}`}>Edit</Link>
            <button className="btn btn-small btn-danger" onClick={() => deleteCourt(court._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyCourts;
