import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Marketplace } from './Marketplace';
import { AdminDashboard } from './admin/AdminDashboard'; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The '*' is CRITICAL here. 
           It allows the AdminDashboard to handle its own sub-routes 
           like /admin/users, /admin/settings, etc.
        */}
        <Route path="/admin/*" element={<AdminDashboard />} />
        
        {/* Main Marketplace Route */}
        <Route path="/*" element={<Marketplace />} />
      </Routes>
    </BrowserRouter>
  );
}