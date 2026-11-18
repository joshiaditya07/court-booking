import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.info("Logged out");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        <span className="brand-mark">CB</span>
        <span>Court<span className="brand-accent">ly</span></span>
      </Link>
      <div className="nav-links">
        <Link to="/" className="nav-primary">Find a court</Link>
        {user ? (
          <>
            <Link to="/my-courts">My Courts</Link>
            <Link to="/add-court">Add Court</Link>
            <Link to="/profile" className="profile-link"><span className="avatar">{user.name?.charAt(0).toUpperCase()}</span>{user.name}</Link>
            <button className="btn btn-small btn-outline" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="btn btn-small">Get started</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
