import { useAuth } from '../../auth/AuthContext';
import { Button } from '../../components';
import '../../App.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="userInfo">
        <span className="userName">Welcome, <strong>{user?.name}</strong></span>
        <span className="userEmail">{user?.email}</span>
      </div>
      <Button onClick={logout} >LogOut</Button>
    </nav>
  );
};

export default Navbar;