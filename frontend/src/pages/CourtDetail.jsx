import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api, { errMsg } from "../api.js";

const CourtDetail = () => {
  const { id } = useParams();
  const [court, setCourt] = useState(null);

  useEffect(() => {
    api
      .get(`/court/${id}`)
      .then((res) => setCourt(res.data.data))
      .catch((err) => toast.error(errMsg(err)));
  }, [id]);

  if (!court) return <p>Loading...</p>;

  return (
    <div className="detail-page">
      <div className={`detail-visual sport-${court.sport}`}><span>{court.sport === "basketball" ? "🏀" : court.sport === "badminton" ? "🏸" : court.sport === "cricket" ? "🏏" : court.sport === "table tennis" ? "🏓" : court.sport === "swimming" ? "🏊" : court.sport === "tennis" ? "🎾" : court.sport === "volleyball" ? "🏐" : "⚽"}</span></div>
      <div className="detail-grid">
      <div className="card detail-info">
        <span className="tag">{court.sport}</span>
        <h1>{court.name}</h1>
        <p className="location">⌖ {court.location}</p>
        <p className="detail-description">{court.description || "A great place to get active, compete, and have fun."}</p>
        <div className="detail-meta"><div><span>Price</span><strong>NPR {court.pricePerHour}<small> / hour</small></strong></div><div><span>Managed by</span><strong>{court.owner?.name || "Courtly partner"}</strong></div></div>
      </div>

      </div>
    </div>
  );
};

export default CourtDetail;
