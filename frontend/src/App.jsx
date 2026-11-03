import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Quizzes } from './pages/Quizzes';
import { QuizPlay } from './pages/QuizPlay';
import { AdminDashboard } from './pages/AdminDashboard';
import { Competitions } from './pages/Competitions';
import { EditQuiz } from './pages/EditQuiz';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/quiz/:id" element={<QuizPlay />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/edit-quiz/:id" element={<EditQuiz />} />
          <Route path="/competitions" element={<Competitions />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}