
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { LogIn } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  
const handleLogin = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    const res = await axios.post(
      'http://localhost:5000/api/auth/login',
      { email, password }
    );

    const user = res.data.user;
    const token = res.data.token;

    console.log('Login response:', res.data);
    console.log('User:', user);
    console.log('isAdmin:', user?.isAdmin);
    console.log('Role:', user?.role);

    if (!user || !token) {
      setError('Invalid login response from server.');
      return;
    }

    // Save user and token in AuthContext
    login(user, token);

    // Redirect based on admin status
    if (user.isAdmin === true || user.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/quizzes');
    }

  } catch (err) {
    setError(
      err.response?.data?.message || 'Invalid email or password.'
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">

      <form
        onSubmit={handleLogin}
        className="bg-slate-900 border border-slate-800 p-8 rounded-2xl w-full max-w-md shadow-xl"
      >

        <div className="flex justify-center mb-4">
          <LogIn className="w-12 h-12 text-indigo-400" />
        </div>

        <h2 className="text-3xl font-bold text-center text-indigo-400 mb-2">
          Welcome Back!
        </h2>

        <p className="text-slate-400 text-center mb-8">
          Login to continue learning with StudyHub.
        </p>

        {error && (
          <p className="text-red-400 text-sm mb-4">{error}</p>
        )}

        <label className="text-white block mb-2">Email</label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full p-3 rounded-lg bg-slate-800 text-white mb-5 outline-none border border-slate-700"
        />

        <label className="text-white block mb-2">Password</label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
          className="w-full p-3 rounded-lg bg-slate-800 text-white mb-6 outline-none border border-slate-700"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white py-3 rounded-lg font-semibold"
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>

        <p className="text-slate-400 text-center mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-purple-400 hover:text-purple-300">
            Register
          </Link>
        </p>

      </form>
    </div>
  );
}
