import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api, { errMsg, SPORTS } from "../api.js";

const Courts = () => {
  const [courts, setCourts] = useState([]);
  const [filters, setFilters] = useState({ search: "", sport: "", maxPrice: "" });
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const params = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params[key] = value;
    });

    api
      .get("/court", { params })
      .then((res) => {
        setCourts(res.data.data);
        setLoadError("");
      })
      .catch((err) => setLoadError(errMsg(err)));
  }, [filters]);

  const handleChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">PLAY MORE. PLAN LESS.</span>
          <h1>Your next game<br /><span>starts here.</span></h1>
          <p>Discover and book the best courts around you. Fast, simple, and ready when you are.</p>
        </div>
        <div className="hero-orbit"><span>🏀</span><span>⚡</span><span>🏸</span></div>
      </section>

      <section className="search-panel">
        <div className="search-heading">
          <span className="search-icon">⌕</span>
          <div><strong>Find your perfect court</strong><span>Search by sport, place, or name</span></div>
        </div>
        <div className="filters">
          <input name="search" placeholder="e.g. Riverside Arena" value={filters.search} onChange={handleChange} />
          <select name="sport" value={filters.sport} onChange={handleChange}>
            <option value="">All sports</option>
            {SPORTS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <input name="maxPrice" type="number" placeholder="Max price (NPR)" value={filters.maxPrice} onChange={handleChange} />
        </div>
      </section>

      <div className="section-heading">
        <div><span className="eyebrow">EXPLORE</span><h2>Popular courts</h2></div>
        <span className="result-count">{courts.length} {courts.length === 1 ? "court" : "courts"} available</span>
      </div>

      {loadError && <div className="empty-state"><span>!</span><h3>Courts could not be loaded</h3><p>{loadError}</p></div>}
      {!loadError && courts.length === 0 && <div className="empty-state"><span>⌕</span><h3>No courts found</h3><p>Try adjusting your search or filters.</p></div>}

      <div className="grid">
        {courts.map((court) => (
          <div className="card court-card" key={court._id}>
            <div className={`court-visual sport-${court.sport}`}><span>{court.sport === "basketball" ? "🏀" : court.sport === "badminton" ? "🏸" : court.sport === "cricket" ? "🏏" : court.sport === "table tennis" ? "🏓" : court.sport === "swimming" ? "🏊" : court.sport === "tennis" ? "🎾" : court.sport === "volleyball" ? "🏐" : "⚽"}</span><span className="visual-label">COURTLY</span></div>
            <div className="court-card-body">
              <div className="row between"><span className="tag">{court.sport}</span>{court.isActive && <span className="availability"><i /> Available</span>}</div>
              <h3>{court.name}</h3>
              <p className="location">⌖ {court.location}</p>
              <div className="row between card-footer"><p className="price"><strong>NPR {court.pricePerHour}</strong> <span>/ hour</span></p><Link className="btn btn-small" to={`/courts/${court._id}`}>View details <span>→</span></Link></div>
              {!court.isActive && <p className="muted">Not accepting bookings</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courts;
