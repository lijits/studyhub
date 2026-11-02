import React, { useEffect } from 'react';
import { Trophy, Star, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

export const TrophyModal = ({ score, total, onRestart }) => {
  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  const percentage = Math.round((score / total) * 100);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50 p-4">
      <div className="bg-slate-900 border-2 border-yellow-500/50 p-8 rounded-3xl text-center max-w-sm w-full shadow-2xl relative">
        <div className="w-24 h-24 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-500/30">
          <Trophy className="w-14 h-14 text-yellow-400 animate-bounce" />
        </div>
        
        <h2 className="text-3xl font-black text-white mb-1">Congratulations!</h2>
        <p className="text-slate-400 text-sm mb-6">Quiz Completed Successfully</p>

        <div className="bg-slate-800 p-4 rounded-xl mb-6 border border-slate-700">
          <p className="text-slate-400 text-xs uppercase font-semibold">Your Total Score</p>
          <p className="text-4xl font-extrabold text-indigo-400 my-1">{score} / {total}</p>
          <p className="text-yellow-400 font-bold text-sm flex justify-center items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400" /> {percentage}% Accuracy
          </p>
        </div>

        <button
          onClick={onRestart}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg transition"
        >
          <RotateCcw className="w-5 h-5" /> Back to Quizzes
        </button>
      </div>
    </div>
  );
};