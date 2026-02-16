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