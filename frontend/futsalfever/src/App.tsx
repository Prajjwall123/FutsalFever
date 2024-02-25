import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminDashboard from './Pages/AdminDahboard';
import Dashboard from './Pages/Dashboard';
import FutsalDetailsPage from './Pages/FutsalDetail';
import LoginPage from './Pages/login';
import RegisterPage from './Pages/register';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="" element={<Dashboard />} />
          <Route path="/booking/:id" element={<FutsalDetailsPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
