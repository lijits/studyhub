
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserPlus } from 'lucide-react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post(
        'http://localhost:5000/api/auth/register',
        {
          name,
          email,
          phone,
          password
        }
      );

      alert('Registration successful! Please log in.');
      navigate('/login');

    } catch (err) {
      setError(
        err.response?.data?.message || 'Registration failed. Try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">

      <form
        onSubmit={handleRegister}
        className="bg-slate-900 border border-slate-800 p-8 rounded-2xl w-full max-w-md shadow-xl"
      >

        <div className="flex justify-center mb-4">
          <UserPlus className="w-12 h-12 text-purple-400" />
        </div>

        <h2 className="text-3xl font-bold text-center text-purple-400 mb-2">
          Create Account
        </h2>

        <p className="text-slate-400 text-center mb-8">
          Join StudyHub and start learning!
        </p>

        {error && (
          <p className="text-red-400 text-sm mb-4">{error}</p>
        )}

        <label className="text-white block mb-2">Full Name</label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
          className="w-full p-3 rounded-lg bg-slate-800 text-white mb-4 outline-none border border-slate-700"
        />

        <label className="text-white block mb-2">Email</label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full p-3 rounded-lg bg-slate-800 text-white mb-4 outline-none border border-slate-700"
        />

        <label className="text-white block mb-2">Phone</label>

        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter phone number"
          required
          className="w-full p-3 rounded-lg bg-slate-800 text-white mb-4 outline-none border border-slate-700"
        />

        <label className="text-white block mb-2">Password</label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create password"
          required
          minLength={6}
          className="w-full p-3 rounded-lg bg-slate-800 text-white mb-6 outline-none border border-slate-700"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white py-3 rounded-lg font-semibold"
        >
          {loading ? 'Creating Account...' : 'Register'}
        </button>

        <p className="text-slate-400 text-center mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-400 hover:text-purple-300">
            Log In
          </Link>
        </p>

      </form>
    </div>
  );
}
