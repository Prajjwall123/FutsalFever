import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import FutsalDetailsPage from './Pages/FutsalDetail';
import AdminFutsalPage from './Pages/admin';
import FutsalCreation from './Pages/futsalCreation';
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
          <Route path="/admin" element={<AdminFutsalPage />} />
          <Route path="/futsal_creation" element={<FutsalCreation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
