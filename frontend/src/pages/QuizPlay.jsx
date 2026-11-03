import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { TrophyModal } from '../components/TrophyModal';

export const QuizPlay = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showTrophy, setShowTrophy] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/quizzes/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setQuiz(res.data))
      .catch(() => navigate('/quizzes'));
  }, [id, token]);

  if (!quiz) return <div className="text-center py-20">Loading Quiz...</div>;

  if (!quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="text-white p-8 text-center">
        <h2>No questions found for this quiz!</h2>
        <p>Please add questions from the Admin Panel.</p>
      </div>
    );
  }

  const currentQ = quiz.questions[currentIndex];

  const handleNext = () => {
    if (selectedOption === currentQ.correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
    setSelectedOption(null);

    if (currentIndex + 1 < quiz.questions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setShowTrophy(true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
          <h3 className="text-lg font-bold text-indigo-400">{quiz.title}</h3>
          <span className="text-sm font-semibold text-slate-400">Question {currentIndex + 1} / {quiz.questions.length}</span>
        </div>

        <h4 className="text-xl font-semibold mb-6">{currentQ.questionText}</h4>

        <div className="space-y-3 mb-8">
          {currentQ.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedOption(idx)}
              className={`w-full text-left p-4 rounded-xl font-medium border transition ${
                selectedOption === idx
                  ? 'bg-indigo-600 border-indigo-500 text-white'
                  : 'bg-slate-800 border-slate-700 hover:bg-slate-750 text-slate-200'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        <button
          disabled={selectedOption === null}
          onClick={handleNext}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition"
        >
          {currentIndex + 1 === quiz.questions.length ? 'Submit Quiz' : 'Next Question'}
        </button>
      </div>

      {showTrophy && (
        <TrophyModal
          score={score + (selectedOption === currentQ.correctAnswerIndex ? 1 : 0)}
          total={quiz.questions.length}
          onRestart={() => navigate('/quizzes')}
        />
      )}
    </div>
  );
};