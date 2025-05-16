import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import OrderDetail from './pages/OrderDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
