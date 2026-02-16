import { useAuth } from '../../auth/AuthContext';
import '../../App.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="userInfo">
        <span className="userName">Welcome, <strong>{user?.name}</strong></span>
        <span className="userEmail">{user?.email}</span>
      </div>
      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;