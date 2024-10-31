import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { ShopProvider } from './shared/context/ShopContext';
import Login from './pages/login/Login';
import Summary from './pages/summary';
import { UserProvider } from './shared/context/UserContext';
import Home from './pages/home/Home';

function App() {
  return (
    <UserProvider>
      <ShopProvider>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/summary" element={<Summary />} />
          <Route path='/' element={<Login/>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ShopProvider>
    </UserProvider>
    
  );
}

export default App;
