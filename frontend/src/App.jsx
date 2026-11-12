
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';

import { Home } from './pages/Home';
import { Quizzes } from './pages/Quizzes';
import { QuizPlay } from './pages/QuizPlay';
import { AdminDashboard } from './pages/AdminDashboard';
import { Competitions } from './pages/Competitions';
import { EditQuiz } from './pages/EditQuiz';

import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        <Navbar />

        <Routes>

          {/* Public pages */}
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          {/* Protected user pages */}
          <Route
            path="/quizzes"
            element={
              <ProtectedRoute>
                <Quizzes />
              </ProtectedRoute>
            }
          />

          <Route
            path="/quiz/:id"
            element={
              <ProtectedRoute>
                <QuizPlay />
              </ProtectedRoute>
            }
          />

          <Route
            path="/competitions"
            element={
              <ProtectedRoute>
                <Competitions />
              </ProtectedRoute>
            }
          />

          {/* Admin-only pages */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/edit-quiz/:id"
            element={
              <ProtectedRoute adminOnly={true}>
                <EditQuiz />
              </ProtectedRoute>
            }
          />

          {/* Unknown pages */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>

      </BrowserRouter>
    </AuthProvider>
  );
}
