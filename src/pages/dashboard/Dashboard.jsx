// import { useAuth } from '../../auth/AuthContext';
// import Button from '../../components/button/Button';
// import '../../App.css';

// function Dashboard() {
//   const { user, logout } = useAuth();

//   return (
//     <div className="container">
//       <div className="formContainer dashboardContainer">
//         <h2>Welcome, {user?.name}!</h2>
//         <p>You have successfully logged in with <strong>{user?.email}</strong>.</p>
//         <Button  className="logout-btn">
//           Todo
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;


import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar';
import '../../App.css';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboardContainer">
      <Navbar />
      <div className="dashboardContent">
        <h1>Your Workspace</h1>
        <div className="tilesGrid">
          {/* The To-Do App Tile */}
          <div className="tile" onClick={() => navigate('/todo')}>
            <div className="tileIcon">📝</div>
            <h3>To-Do App</h3>
            <p>Manage your daily tasks efficiently.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;