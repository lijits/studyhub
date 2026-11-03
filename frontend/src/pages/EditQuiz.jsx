import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export const EditQuiz = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  // State for the entire quiz document
  const [quizData, setQuizData] = useState({
    title: '',
    level: 'Beginner',
    category: '',
    questions: []
  });

  useEffect(() => {
    // Fetch existing quiz data
    axios.get(`http://localhost:5000/api/quizzes/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setQuizData(res.data))
    .catch(err => console.error(err));
  }, [id, token]);

  // Handle changes to quiz header fields (Title, Category, Level)
  const handleHeaderChange = (e) => {
    setQuizData({ ...quizData, [e.target.name]: e.target.value });
  };

  // Handle changes to a specific question field
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[index][field] = value;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  // Handle changes to options inside a specific question
  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[qIndex].options[optIndex] = value;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  // Delete a specific question
  const handleDeleteQuestion = (indexToDelete) => {
    const updatedQuestions = quizData.questions.filter((_, idx) => idx !== indexToDelete);
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  // Add a new empty question template
  const handleAddQuestion = () => {
    const newQuestion = {
      questionText: '',
      options: ['', '', '', ''],
      correctAnswerIndex: 0
    };
    setQuizData({ ...quizData, questions: [...quizData.questions, newQuestion] });
  };

  // Submit all changes to backend
  const handleSaveQuiz = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/quizzes/${id}`, quizData, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      alert('Quiz updated successfully!');
      navigate('/admin'); // or wherever your admin dashboard is
    })
    .catch(err => alert('Error updating quiz: ' + err.message));
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-white">
      <h2 className="text-3xl font-bold mb-6">Edit Quiz & Questions</h2>
      
      <form onSubmit={handleSaveQuiz} className="space-y-8">
        {/* Quiz Header Info */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-xl font-semibold text-indigo-400">Quiz Details</h3>
          <div>
            <label className="block text-sm mb-1">Quiz Title</label>
            <input 
              type="text" 
              name="title" 
              value={quizData.title} 
              onChange={handleHeaderChange}
              className="w-full bg-slate-800 p-3 rounded-xl border border-slate-700"
              required 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Category</label>
              <input 
                type="text" 
                name="category" 
                value={quizData.category} 
                onChange={handleHeaderChange}
                className="w-full bg-slate-800 p-3 rounded-xl border border-slate-700"
                required 
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Level</label>
              <select 
                name="level" 
                value={quizData.level} 
                onChange={handleHeaderChange}
                className="w-full bg-slate-800 p-3 rounded-xl border border-slate-700"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>

        {/* Questions Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-indigo-400">Questions ({quizData.questions.length})</h3>
            <button 
              type="button" 
              onClick={handleAddQuestion}
              className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-xl text-sm font-semibold transition"
            >
              + Add Question
            </button>
          </div>

          {quizData.questions.map((q, qIndex) => (
            <div key={qIndex} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 relative">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-400">Question #{qIndex + 1}</span>
                <button 
                  type="button" 
                  onClick={() => handleDeleteQuestion(qIndex)}
                  className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded-lg text-xs font-semibold transition"
                >
                  Delete Question
                </button>
              </div>

              <div>
                <label className="block text-sm mb-1">Question Text</label>
                <input 
                  type="text" 
                  value={q.questionText}
                  onChange={(e) => handleQuestionChange(qIndex, 'questionText', e.target.value)}
                  className="w-full bg-slate-800 p-3 rounded-xl border border-slate-700"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {q.options.map((opt, optIndex) => (
                  <div key={optIndex}>
                    <label className="block text-xs mb-1 text-slate-400">Option {optIndex + 1}</label>
                    <input 
                      type="text" 
                      value={opt}
                      onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                      className="w-full bg-slate-800 p-2.5 rounded-xl border border-slate-700 text-sm"
                      required
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm mb-1">Correct Answer Index (0 to 3)</label>
                <input 
                  type="number" 
                  min="0" 
                  max="3"
                  value={q.correctAnswerIndex}
                  onChange={(e) => handleQuestionChange(qIndex, 'correctAnswerIndex', Number(e.target.value))}
                  className="w-32 bg-slate-800 p-2.5 rounded-xl border border-slate-700 text-sm"
                  required
                />
              </div>
            </div>
          ))}
        </div>

        <button 
          type="submit" 
          className="w-full bg-indigo-600 hover:bg-indigo-500 font-bold py-4 rounded-xl transition shadow-lg"
        >
          Save All Changes
        </button>
      </form>
    </div>
  );
};