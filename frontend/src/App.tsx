import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Marketplace } from './Marketplace';

// Placeholder for the Admin Dashboard (we will build this next)
const AdminLayout = () => (
  <div className="p-10 text-center">
    <h1 className="text-3xl font-bold text-emerald-900">Admin Dashboard</h1>
    <p>Secure Area - Coming Soon</p>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminLayout />} />
        
        {/* Customer Routes (Default) */}
        <Route path="/*" element={<Marketplace />} />
      </Routes>
    </BrowserRouter>
  );
}