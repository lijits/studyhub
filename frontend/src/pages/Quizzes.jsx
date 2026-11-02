import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Play, Lock } from 'lucide-react';

export const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:5000/api/quizzes', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => setQuizzes(res.data))
        .catch(err => console.error(err));
    }
  }, [token]);

  if (!token) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
        <Lock className="w-16 h-16 text-indigo-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Login Required to Play Quizzes</h2>
        <p className="text-slate-400 max-w-md">Please click the Log In or Register button in the navigation bar to start taking quizzes.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-extrabold mb-8 text-indigo-400">Available Quizzes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quizzes.map(quiz => (
          <div key={quiz._id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-indigo-500/50 transition shadow-lg">
            <div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${
                quiz.level === 'Beginner' ? 'bg-emerald-500/20 text-emerald-400' :
                quiz.level === 'Intermediate' ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {quiz.level}
              </span>
              <h3 className="text-xl font-bold mt-3 mb-2">{quiz.title}</h3>
              <p className="text-slate-400 text-sm mb-4">Category: {quiz.category}</p>
              <p className="text-slate-500 text-xs mb-6">{quiz.questions.length} Questions Included</p>
            </div>
            <button
              onClick={() => navigate(`/quiz/${quiz._id}`)}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition"
            >
              <Play className="w-4 h-4" /> Start Quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};