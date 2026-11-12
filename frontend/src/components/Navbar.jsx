import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, User, Shield, Trophy, BookOpen, Home, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/login');
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand / Logo */}
        <Link to="/" className="text-xl font-extrabold text-indigo-400 flex items-center gap-2">
          <span>StudyHub</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-slate-300 hover:text-white text-sm font-medium flex items-center gap-1.5 transition">
            <Home className="w-4 h-4" /> Home
          </Link>
          
          {user && (
            <>
              <Link to="/quizzes" className="text-slate-300 hover:text-white text-sm font-medium flex items-center gap-1.5 transition">
                <BookOpen className="w-4 h-4" /> Quizzes
              </Link>
              <Link to="/competitions" className="text-slate-300 hover:text-white text-sm font-medium flex items-center gap-1.5 transition">
                <Trophy className="w-4 h-4" /> Competitions
              </Link>
            </>
          )}

          {/* Admin Link (Only shows if user is admin) */}
          {user?.role === 'admin' && (
            <Link to="/admin" className="text-amber-400 hover:text-amber-300 text-sm font-medium flex items-center gap-1.5 transition">
              <Shield className="w-4 h-4" /> Admin Dashboard
            </Link>
          )}
        </div>

        {/* Desktop Auth Actions */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-slate-300 text-sm bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700">
                <User className="w-4 h-4 text-indigo-400" />
                <span className="font-semibold">{user.name || user.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-slate-300 hover:text-white text-sm font-semibold px-4 py-2 transition"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition shadow-lg"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-300 hover:text-white focus:outline-none"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-slate-800 flex flex-col space-y-3 pb-2">
          <Link 
            to="/" 
            onClick={() => setIsOpen(false)}
            className="text-slate-300 hover:text-white text-sm font-medium flex items-center gap-2 py-2"
          >
            <Home className="w-4 h-4" /> Home
          </Link>
          
          {user && (
            <>
              <Link 
                to="/quizzes" 
                onClick={() => setIsOpen(false)}
                className="text-slate-300 hover:text-white text-sm font-medium flex items-center gap-2 py-2"
              >
                <BookOpen className="w-4 h-4" /> Quizzes
              </Link>
              <Link 
                to="/competitions" 
                onClick={() => setIsOpen(false)}
                className="text-slate-300 hover:text-white text-sm font-medium flex items-center gap-2 py-2"
              >
                <Trophy className="w-4 h-4" /> Competitions
              </Link>
            </>
          )}

          {user?.role === 'admin' && (
            <Link 
              to="/admin" 
              onClick={() => setIsOpen(false)}
              className="text-amber-400 hover:text-amber-300 text-sm font-medium flex items-center gap-2 py-2"
            >
              <Shield className="w-4 h-4" /> Admin Dashboard
            </Link>
          )}

          <div className="pt-3 border-t border-slate-800 flex flex-col space-y-3">
            {user ? (
              <>
                <div className="flex items-center gap-2 text-slate-300 text-sm bg-slate-800 px-3 py-2 rounded-xl border border-slate-700 w-fit">
                  <User className="w-4 h-4 text-indigo-400" />
                  <span className="font-semibold">{user.name || user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition w-full"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-center text-slate-300 hover:text-white text-sm font-semibold px-4 py-2 border border-slate-700 rounded-xl transition"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="text-center bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition shadow-lg"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}