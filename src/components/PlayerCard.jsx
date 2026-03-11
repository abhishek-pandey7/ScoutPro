import React from "react";

// Helper to determine color based on percentage
const getColor = (value, max) => {
  if (!max || max === 0) return "bg-slate-300";
  const percentage = (Number(value) / max) * 100;
  if (percentage >= 75) return "bg-emerald-500 shadow-emerald-500/20";
  if (percentage >= 40) return "bg-amber-500 shadow-amber-500/20";
  return "bg-rose-500 shadow-rose-500/20";
};

// Helper to determine text color for labels
const getTextColor = (value, max) => {
  if (!max || max === 0) return "text-slate-600";
  const percentage = (Number(value) / max) * 100;
  if (percentage >= 75) return "text-emerald-700";
  if (percentage >= 40) return "text-amber-700";
  return "text-rose-700";
};

// Helper component for stat bars
const StatBar = ({ label, value, max = 100, suffix = "" }) => {
  const percentage = Math.min(100, Math.max(0, (Number(value || 0) / max) * 100));
  const color = getColor(value, max);
  const textColor = getTextColor(value, max);
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-end mb-2">
        <span className="font-bold text-slate-500 text-sm tracking-wide">{label}</span>
        <span className={`font-black text-xl leading-none ${textColor}`}>{value !== null && value !== undefined ? value : 0}{suffix}</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2 shadow-inner overflow-hidden">
        <div
          className={`h-2 rounded-full ${color} shadow-sm transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

// Helper component for simple stat cards
const StatCube = ({ label, value }) => (
  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center text-center">
    <div className="text-3xl font-black text-slate-800 tracking-tight">{value !== null && value !== undefined ? value : "-"}</div>
    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">{label}</div>
  </div>
);


const PlayerCard = ({ data }) => {
  if (!data || !data.response || data.response.length === 0) {
    return (
      <div className="bg-white p-10 text-center rounded-3xl border border-slate-200 max-w-lg mx-auto shadow-sm">
        <h3 className="text-2xl font-black text-slate-800 mb-2">No Stats Found</h3>
        <p className="text-slate-500 font-medium tracking-wide">We couldn't find any detailed statistics for this player in the selected season.</p>
      </div>
    );
  }

  const player = data.response[0].player;
  const stats = data.response[0].statistics || [];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-fade-in-up">
      {/* Main Profile Header */}
      <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-slate-50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 relative z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-slate-100 rounded-full scale-[1.15] -z-10 shadow-sm border border-slate-200"></div>
            <img
              src={player.photo}
              alt={player.name}
              className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-full border-4 border-white shadow-lg bg-white"
              onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=' + player.name + '&background=f1f5f9&color=64748b&size=256' }}
            />
          </div>

          <div className="text-center md:text-left flex-1 mt-4 md:mt-0">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase mb-6 drop-shadow-sm">
              {player.firstname} {player.lastname}
            </h2>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <span className="px-5 py-2.5 bg-slate-50 text-slate-600 rounded-xl font-bold text-sm uppercase tracking-wider border border-slate-100 shadow-sm">
                Age: {player.age}
              </span>
              <span className="px-5 py-2.5 bg-slate-50 text-slate-600 rounded-xl font-bold text-sm uppercase tracking-wider border border-slate-100 shadow-sm">
                Nat: {player.nationality}
              </span>
              <span className="px-5 py-2.5 bg-slate-50 text-slate-600 rounded-xl font-bold text-sm uppercase tracking-wider border border-slate-100 shadow-sm">
                H: {player.height || "N/A"}
              </span>
              <span className="px-5 py-2.5 bg-slate-50 text-slate-600 rounded-xl font-bold text-sm uppercase tracking-wider border border-slate-100 shadow-sm">
                W: {player.weight || "N/A"}
              </span>
              {player.injured && (
                <span className="px-5 py-2.5 bg-rose-50 text-rose-600 rounded-xl font-black text-sm uppercase tracking-wider border border-rose-100 shadow-sm">
                  Injured
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Competitions / Stats Grid */}
      <div className="space-y-10">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
            {/* League Header */}
            <div className="bg-slate-50 border-b border-slate-200 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center p-3 shadow-sm border border-slate-100">
                  <img src={stat.league.logo} alt={stat.league.name} className="max-w-full max-h-full object-contain drop-shadow-sm" onError={(e) => e.target.style.display = 'none'} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-800 uppercase tracking-widest">{stat.league.name}</h3>
                  <p className="text-slate-400 font-bold text-sm tracking-wider mt-1">SEASON {stat.league.season}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-xl shadow-sm border border-slate-100">
                <img src={stat.team.logo} alt={stat.team.name} className="w-10 h-10 object-contain drop-shadow-sm" onError={(e) => e.target.style.display = 'none'} />
                <span className="font-black text-slate-700 uppercase tracking-widest">{stat.team.name}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-200 mx-2"></span>
                <span className="font-black text-emerald-500 uppercase tracking-widest">{stat.games.position}</span>
              </div>
            </div>

            <div className="p-8 md:p-10 bg-white">
              {/* Quick Stats Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-14">
                <StatCube label="Appearances" value={stat.games.appearences || stat.games.appearances} />
                <StatCube label="Goals" value={stat.goals.total} />
                <StatCube label="Assists" value={stat.goals.assists} />
                <div className={`p-5 rounded-2xl border ${getColor(stat.games.rating, 10).replace('bg-', 'border-').replace('shadow-', 'shadow-sm shadow-').split(' ')[0]} bg-slate-50 flex flex-col items-center justify-center text-center shadow-sm`}>
                  <div className={`text-3xl font-black tracking-tight ${getTextColor(stat.games.rating, 10)}`}>{stat.games.rating ? Number(stat.games.rating).toFixed(2) : "-"}</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Rating</div>
                </div>
              </div>

              {/* Detailed Performance Charts */}
              <div className="grid md:grid-cols-2 gap-x-20 gap-y-14">
                {/* Attacking */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <span className="h-6 w-1.5 bg-slate-800 rounded-full"></span>
                    <h4 className="text-xl font-black text-slate-800 uppercase tracking-widest">
                      Attacking
                    </h4>
                  </div>
                  <StatBar label="Shots on Target / Total" value={stat.shots.on} max={stat.shots.total || 1} suffix={` / ${stat.shots.total || 0}`} />
                  <StatBar label="Goals to Shots Ratio" value={stat.goals.total} max={stat.shots.total || 1} />
                  <StatBar label="Key Passes" value={stat.passes.key} max={50} />
                </div>

                {/* Passing & Playmaking */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <span className="h-6 w-1.5 bg-slate-800 rounded-full"></span>
                    <h4 className="text-xl font-black text-slate-800 uppercase tracking-widest">
                      Distribution
                    </h4>
                  </div>
                  <StatBar label="Pass Accuracy" value={stat.passes.accuracy ? parseInt(stat.passes.accuracy) : 0} max={100} suffix="%" />
                  <StatBar label="Total Passes" value={stat.passes.total} max={1000} />
                  <StatBar label="Successful Dribbles" value={stat.dribbles.success} max={stat.dribbles.attempts || 1} suffix={` / ${stat.dribbles.attempts || 0}`} />
                </div>

                {/* Defense */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <span className="h-6 w-1.5 bg-slate-800 rounded-full"></span>
                    <h4 className="text-xl font-black text-slate-800 uppercase tracking-widest">
                      Defense
                    </h4>
                  </div>
                  <StatBar label="Tackles" value={stat.tackles.total} max={100} />
                  <StatBar label="Interceptions" value={stat.tackles.interceptions} max={50} />
                  <StatBar label="Blocks" value={stat.tackles.blocks} max={30} />
                </div>

                {/* Physicality & Discipline */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <span className="h-6 w-1.5 bg-slate-800 rounded-full"></span>
                    <h4 className="text-xl font-black text-slate-800 uppercase tracking-widest">
                      Discipline
                    </h4>
                  </div>
                  <StatBar label="Duels Won" value={stat.duels.won} max={stat.duels.total || 1} suffix={` / ${stat.duels.total || 0}`} />
                  
                  <div className="mt-8 flex gap-5">
                    <div className="flex-1 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-amber-100 rounded-full blur-xl -mr-4 -mt-4 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                      <div className="font-bold text-slate-400 uppercase text-xs tracking-widest mb-2 relative z-10">Yellow Cards</div>
                      <div className="text-4xl font-black text-amber-500 relative z-10">{stat.cards.yellow || 0}</div>
                    </div>
                    <div className="flex-1 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-rose-100 rounded-full blur-xl -mr-4 -mt-4 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                      <div className="font-bold text-slate-400 uppercase text-xs tracking-widest mb-2 relative z-10">Red Cards</div>
                      <div className="text-4xl font-black text-rose-500 relative z-10">{stat.cards.red || 0}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerCard;
