import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';

import PrivateRoute from './components/PrivateRoute';

import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default App;
