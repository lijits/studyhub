import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { X } from 'lucide-react';

export const AuthModal = ({ type: initialType, onClose }) => {
  const [isRegister, setIsRegister] = useState(initialType === 'register');
  const { login } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [error, setError] = useState('');

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
    const payload = isRegister 
      ? formData 
      : { email: formData.email, password: formData.password };

    try {
      const res = await axios.post(`http://localhost:5000${endpoint}`, payload);
      
      if (isRegister) {
        setIsRegister(false);
        setError('Registration successful! Please log in with your credentials.');
      } else {
        // Safely check if login function exists before calling
        if (typeof login === 'function') {
          // Adjust signature if your AuthContext expects (userData, token) or a single object
          login(res.data.user, res.data.token);
        } else {
          // Fallback: direct localStorage save if context method is missing
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
        }
        
        if (onClose) onClose();
      }
    } catch (err) {
      console.error('Authentication error details:', err);
      
      // If it was a network/API error from Axios:
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        // Log frontend JS runtime errors to console for debugging
        setError(err.message || 'An error occurred during authentication.');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl w-full max-w-md relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition">
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-indigo-400">
          {isRegister ? 'Join StudyHub★' : 'Welcome Back'}
        </h2>

        {error && (
          <p className="mb-4 text-sm bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <>
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  required={isRegister}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Phone Number</label>
                <input
                  type="text"
                  required={isRegister}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter your phone number"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Account Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="user">User Student</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="name@example.com"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Password</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl shadow-lg transition mt-4"
          >
            {isRegister ? 'Register Account' : 'Log In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button onClick={toggleMode} type="button" className="text-indigo-400 font-semibold underline hover:text-indigo-300">
            {isRegister ? 'Log In' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
};