import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import AddRoom from './pages/AddRoom';
import MyRooms from './pages/MyRooms';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/add-room" 
            element={
              <ProtectedRoute>
                <AddRoom />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/my-rooms" 
            element={
              <ProtectedRoute>
                <MyRooms />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
