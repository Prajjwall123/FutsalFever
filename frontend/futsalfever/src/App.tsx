import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import BookingDetail from './Pages/FutsalDetail';
import LoginPage from './Pages/login';
import RegisterPage from './Pages/register';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="" element={<Dashboard />} />
          <Route path="/booking/:id" element={<BookingDetail />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
