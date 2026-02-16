import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { Dashboard, Signinform, Signupform, Todo } from '../pages';

const Protected = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/signin" />;
};
const Public = ({ children }) => {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/dashboard" />;
};
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Public><Signupform /></Public>} />
      <Route path="/signin" element={<Public><Signinform /></Public>} />
      <Route path="/dashboard" element={ <Protected><Dashboard /></Protected>} />
      <Route path="/todo" element={ <Protected><Todo /></Protected>} />
      <Route path="/" element={<Navigate to="/signup" />} />
      <Route path="*" element={<Navigate to="/signin" />} />
    </Routes>
  );
};

export default AppRoutes;