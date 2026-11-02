import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Trophy, BookOpen, Users } from 'lucide-react';

export const Home = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center items-center px-6 text-center">
      <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
        <Sparkles className="w-4 h-4" /> Next-Gen Learning & Competition Platform
      </div>

      <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
        Master Skills with <span className="text-indigo-400">STUDYHUB</span><span className="text-yellow-400">★</span>
      </h1>

      <p className="max-w-2xl text-slate-400 text-lg md:text-xl mb-8 leading-relaxed">
        Test your expertise across Beginner, Intermediate, and Advanced quizzes, or join live global online competitions to earn real rewards.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-16">
        <Link to="/quizzes" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-4 rounded-xl shadow-xl transition text-lg">
          Explore Quizzes
        </Link>
        <Link to="/competitions" className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-8 py-4 rounded-xl border border-slate-700 transition text-lg">
          Live Competitions
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full text-left">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <BookOpen className="w-8 h-8 text-indigo-400 mb-3" />
          <h3 className="font-bold text-lg mb-1">Level-Based Quizzes</h3>
          <p className="text-slate-400 text-sm">Targeted tracks from beginner fundamentals to expert mastery.</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <Trophy className="w-8 h-8 text-yellow-400 mb-3" />
          <h3 className="font-bold text-lg mb-1">Instant Trophy Rewards</h3>
          <p className="text-slate-400 text-sm">Win interactive trophy achievements upon completing quizzes.</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <Users className="w-8 h-8 text-emerald-400 mb-3" />
          <h3 className="font-bold text-lg mb-1">Live Tournaments</h3>
          <p className="text-slate-400 text-sm">Compete in Chess, Singing, and Tech contests with prize pools.</p>
        </div>
      </div>
    </div>
  );
};