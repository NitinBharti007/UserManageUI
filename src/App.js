import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import UserTable from './components/UserTable';
import UserDetail from './pages/UserDetail';
import './App.css';

function App() {
  return (
    <>
      <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex space-x-4">
            <Link to="/" className="text-white text-lg hover:text-gray-200 transition duration-300">
              Home
            </Link>
            {/* You can add more links here if needed */}
          </div>
        </div>
      </nav>
      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Routes>
            <Route path="/" element={<UserTable />} />
            <Route path="/users/:id" element={<UserDetail />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
