

import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AuthModal } from './AuthModal';
import { Award, LogOut, User as UserIcon, Shield, Trophy } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [authType, setAuthType] = useState(null); // 'login' or 'register'
  const navigate = useNavigate();

  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 sticky top-0 z-40 flex justify-between items-center shadow-lg">
      <Link to="/" className="flex items-center gap-2 text-2xl font-black text-indigo-400 tracking-wider">
        <span>STUDYHUB</span>
        <span className="text-yellow-400 text-3xl">★</span>
      </Link>

      <div className="flex items-center gap-6 font-medium text-slate-300">
        <Link to="/quizzes" className="hover:text-indigo-400 transition">Quizzes</Link>
        <Link to="/competitions" className="hover:text-indigo-400 transition flex items-center gap-1">
          <Trophy className="w-4 h-4 text-yellow-400" /> Competitions
        </Link>
        {user?.role === 'admin' && (
          <Link to="/admin" className="hover:text-amber-400 transition flex items-center gap-1 text-amber-400">
            <Shield className="w-4 h-4" /> Admin Panel
          </Link>
        )}
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-slate-300 flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
              <UserIcon className="w-4 h-4 text-indigo-400" />
              {user.name} <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full capitalize">{user.role}</span>
            </span>
            <button
              onClick={() => { logout(); navigate('/'); }}
              className="bg-red-500/10 hover:bg-red-500/20 text-red-400 p-2 rounded-xl transition"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAuthType('login')}
              className="text-slate-300 hover:text-white px-4 py-2 font-medium"
            >
              Log In
            </button>
            <button
              onClick={() => setAuthType('register')}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-xl font-semibold shadow-lg shadow-indigo-600/30 transition"
            >
              Register
            </button>
          </div>
        )}
      </div>

      {authType && <AuthModal type={authType} onClose={() => setAuthType(null)} />}
    </nav>
  );
};