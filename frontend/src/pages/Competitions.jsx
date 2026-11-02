import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Trophy, Calendar, Gift } from 'lucide-react';

export const Competitions = () => {
  const [competitions, setCompetitions] = useState([
    {
      _id: '1',
      title: 'Grand Chess League 2026',
      type: 'Chess Contest',
      description: 'Blitz tournament mode. Top 3 highest scores win exclusive rewards.',
      reward: '$500 Amazon Gift Card + Gold Badge',
      eventDate: 'Not announced',
      status: 'Upcoming'
    },
    {
      _id: '2',
      title: 'Global Voice Idol',
      type: 'Online Singing Contest',
      description: 'Upload your 2-minute vocal track and let the community vote.',
      reward: 'Professional Studio Mic & Headphones',
      eventDate: 'not announced',
      status: 'Upcoming'
    }
  ]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:5000/api/competitions', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => { if (res.data.length > 0) setCompetitions(res.data); })
        .catch(err => console.error(err));
    }
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Trophy className="w-8 h-8 text-yellow-400" />
        <h2 className="text-3xl font-extrabold text-white">Announced Competitions & Contests</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {competitions.map(comp => (
          <div key={comp._id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="bg-indigo-500/20 text-indigo-400 text-xs font-bold px-3 py-1 rounded-full uppercase">
                  {comp.type}
                </span>
                <span className="text-xs bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded">
                  {comp.status}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{comp.title}</h3>
              <p className="text-slate-400 text-sm mb-6">{comp.description}</p>
            </div>

            <div className="space-y-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-2 text-sm text-yellow-400 font-medium">
                <Gift className="w-4 h-4" /> Reward: {comp.reward}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Calendar className="w-4 h-4" /> Date: {comp.eventDate}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};