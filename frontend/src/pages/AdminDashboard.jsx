import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Trash2, Edit, Plus } from 'lucide-react';

export const AdminDashboard = () => {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [newQuiz, setNewQuiz] = useState({ title: '', level: 'Beginner', category: '', questions: [] });

  // States for handling adding/editing questions and editing quiz metadata
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  const headers = { Authorization: `Bearer ${token}` };

  const fetchData = () => {
    axios.get('http://localhost:5000/api/admin/users', { headers }).then(res => setUsers(res.data));
    axios.get('http://localhost:5000/api/quizzes', { headers }).then(res => setQuizzes(res.data));
  };

  useEffect(() => { fetchData(); }, []);

  const deleteUser = (id) => {
    axios.delete(`http://localhost:5000/api/admin/users/${id}`, { headers }).then(() => fetchData());
  };

  const deleteQuiz = (id) => {
    axios.delete(`http://localhost:5000/api/quizzes/${id}`, { headers }).then(() => fetchData());
  };

  const createQuiz = (e) => {
    e.preventDefault();
    if (editingQuiz) {
      // Update existing quiz
      axios.put(`http://localhost:5000/api/quizzes/${editingQuiz._id}`, newQuiz, { headers }).then(() => {
        setNewQuiz({ title: '', level: 'Beginner', category: '', questions: [] });
        setEditingQuiz(null);
        fetchData();
      });
    } else {
      // Create new quiz
      axios.post('http://localhost:5000/api/quizzes', newQuiz, { headers }).then(() => {
        setNewQuiz({ title: '', level: 'Beginner', category: '', questions: [] });
        fetchData();
      });
    }
  };

  const handleEditClick = (quiz) => {
    setEditingQuiz(quiz);
    setNewQuiz({ title: quiz.title, level: quiz.level, category: quiz.category, questions: quiz.questions || [] });
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!selectedQuiz) return;

    const newQuestionObj = {
      questionText,
      options,
      correctAnswer: Number(correctAnswer)
    };

    const updatedQuestions = [...(selectedQuiz.questions || []), newQuestionObj];

    axios.put(`http://localhost:5000/api/quizzes/${selectedQuiz._id}`, {
      ...selectedQuiz,
      questions: updatedQuestions
    }, { headers }).then(() => {
      fetchData();
      setQuestionText('');
      setOptions(['', '', '', '']);
      setSelectedQuiz(null);
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-12">
      <h2 className="text-3xl font-black text-amber-400">Admin Control Center</h2>

      {/* User Management */}
      <section className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <h3 className="text-xl font-bold mb-4 text-white">Registered Users</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-slate-300">
            <thead className="bg-slate-800 text-xs uppercase text-slate-400">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id} className="border-b border-slate-800">
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.phone}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3 capitalize">{u.role}</td>
                  <td className="p-3">
                    <button onClick={() => deleteUser(u._id)} className="text-red-400 hover:text-red-300"><Trash2 className="w-5 h-5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Quiz Management */}
      <section className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <h3 className="text-xl font-bold mb-4 text-white">{editingQuiz ? 'Edit Quiz' : 'Manage Quizzes'}</h3>
        <form onSubmit={createQuiz} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <input
            placeholder="Quiz Title"
            value={newQuiz.title}
            onChange={e => setNewQuiz({ ...newQuiz, title: e.target.value })}
            className="bg-slate-800 border border-slate-700 p-2.5 rounded-lg text-white"
            required
          />
          <input
            placeholder="Category"
            value={newQuiz.category}
            onChange={e => setNewQuiz({ ...newQuiz, category: e.target.value })}
            className="bg-slate-800 border border-slate-700 p-2.5 rounded-lg text-white"
            required
          />
          <select
            value={newQuiz.level}
            onChange={e => setNewQuiz({ ...newQuiz, level: e.target.value })}
            className="bg-slate-800 border border-slate-700 p-2.5 rounded-lg text-white"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          <button type="submit" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold p-2.5 rounded-lg flex justify-center items-center gap-2">
            <Plus className="w-5 h-5" /> {editingQuiz ? 'Update Quiz' : 'Add Quiz'}
          </button>
        </form>

        {/* Modal / Form for Adding Questions */}
        {selectedQuiz && (
          <div className="bg-slate-800 p-5 rounded-xl mb-6 border border-slate-700">
            <h4 className="text-lg font-bold text-amber-400 mb-3">Add Question to: {selectedQuiz.title}</h4>
            <form onSubmit={handleAddQuestion} className="space-y-3">
              <input
                type="text"
                placeholder="Enter Question Text"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white"
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {options.map((opt, idx) => (
                  <input
                    key={idx}
                    type="text"
                    placeholder={`Option ${idx + 1}`}
                    value={opt}
                    onChange={(e) => {
                      const newOpts = [...options];
                      newOpts[idx] = e.target.value;
                      setOptions(newOpts);
                    }}
                    className="bg-slate-900 border border-slate-700 p-2 rounded text-white"
                    required
                  />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm text-slate-300">Correct Option Index (0 to 3):</label>
                <select
                  value={correctAnswer}
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                  className="bg-slate-900 border border-slate-700 p-2 rounded text-white"
                >
                  <option value="0">Option 1</option>
                  <option value="1">Option 2</option>
                  <option value="2">Option 3</option>
                  <option value="3">Option 4</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <button type="submit" className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded font-bold">Save Question</button>
                <button type="button" onClick={() => setSelectedQuiz(null)} className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded">Cancel</button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-3">
          {quizzes.map(q => (
            <div key={q._id} className="flex justify-between items-center bg-slate-800 p-4 rounded-xl">
              <div>
                <h4 className="font-bold text-white">{q.title}</h4>
                <p className="text-xs text-slate-400">{q.level} • {q.category} | Questions: {q.questions?.length || 0}</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setSelectedQuiz(q)} 
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded-lg font-semibold"
                >
                  + Add Questions
                </button>
                <button 
                  onClick={() => handleEditClick(q)} 
                  className="text-amber-400 hover:text-amber-300"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => deleteQuiz(q._id)} 
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};