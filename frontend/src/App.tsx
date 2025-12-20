import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Marketplace } from './Marketplace';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<div>Admin Panel Placeholder</div>} />
        <Route path="/*" element={<Marketplace />} />
      </Routes>
    </BrowserRouter>
  );
}