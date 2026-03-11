import { useState } from "react";
import "./index.css";
import SearchBar from "./components/SearchBar";
import PlayerCard from "./components/PlayerCard";
import Spinner from "./components/Spinner";

function App() {
  const [players, setPlayers] = useState([]);
  const [stats, setStats] = useState(null);
  const [season, setSeason] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Step 1: Search player profiles to get IDs
  const searchPlayers = async (playerName, seasonInput) => {
    setSeason(seasonInput);
    setIsLoading(true);

    try {
      const res = await fetch(
        `https://v3.football.api-sports.io/players/profiles?search=${playerName}`,
        {
          headers: {
            "x-apisports-key": import.meta.env.VITE_API_KEY,
          },
        },
      );

      const json = await res.json();
      setPlayers(json.response || []);
      setStats(null);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Fetch stats using player ID
  const fetchStats = async (playerId) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://v3.football.api-sports.io/players?id=${playerId}&season=${season}`,
        {
          headers: {
            "x-apisports-key": import.meta.env.VITE_API_KEY,
          },
        },
      );

      const json = await res.json();
      setStats(json);
      setPlayers([]);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50 font-sans text-slate-900 relative z-0 selection:bg-emerald-200 selection:text-emerald-900 pb-20">
      {/* Background decoration - Football Pitch Experience */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-gradient-to-b from-emerald-600 via-emerald-500 to-emerald-50">
        {/* Grass Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.15] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
        
        {/* Grid Overlay for 'Detail' */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#fff_20%,transparent_100%)] opacity-20"></div>

        {/* Visible Pitch SVG */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30 overflow-hidden">
          <svg width="100%" height="100%" viewBox="0 0 800 1200" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-w-7xl rotate-90 md:rotate-0 text-white">
            <rect x="50" y="50" width="700" height="1100" stroke="currentColor" strokeWidth="4"/>
            <path d="M50 600H750" stroke="currentColor" strokeWidth="4"/>
            <circle cx="400" cy="600" r="100" stroke="currentColor" strokeWidth="4"/>
            <rect x="250" y="50" width="300" height="180" stroke="currentColor" strokeWidth="4"/>
            <rect x="250" y="970" width="300" height="180" stroke="currentColor" strokeWidth="4"/>
            <rect x="330" y="50" width="140" height="60" stroke="currentColor" strokeWidth="4"/>
            <rect x="330" y="1090" width="140" height="60" stroke="currentColor" strokeWidth="4"/>
            <path d="M300 230C320 260 480 260 500 230" stroke="currentColor" strokeWidth="4"/>
            <path d="M300 970C320 940 480 940 500 970" stroke="currentColor" strokeWidth="4"/>
          </svg>
        </div>

        {/* Bottom Fade out */}
        <div className="absolute bottom-0 inset-x-0 h-[400px] bg-gradient-to-t from-emerald-50 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-16 flex flex-col items-center min-h-screen">
        <div className="text-center mb-8 md:mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-emerald-200 shadow-sm text-[10px] md:text-xs font-bold tracking-widest text-emerald-700 uppercase mb-6 md:mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Performance Analytics Engine
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none drop-shadow-lg">
            Scout<span className="text-emerald-300 mx-1">/</span>Pro
          </h1>
          <p className="mt-4 md:mt-8 text-white text-base md:text-lg max-w-2xl mx-auto font-bold leading-relaxed drop-shadow-md px-4">
            Discover player statistics, analyze performance metrics, and dive deep into precise global football data.
          </p>
        </div>

        <SearchBar onSearch={searchPlayers} isLoading={isLoading} />

        {/* Player search results */}
        {players.length > 0 && (
          <div className="mt-20 w-full max-w-5xl animate-fade-in-up">
            <div className="flex items-center justify-between border-b-2 border-slate-200 pb-4 mb-8">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                Select a Profile
              </h2>
              <span className="text-xs font-bold px-2 py-1 bg-slate-100 text-slate-500 rounded-md">
                {players.length} FOUND
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {players.map((p) => (
                <div
                  key={p.player.id}
                  onClick={() => fetchStats(p.player.id)}
                  className="group flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 cursor-pointer transition-all duration-300 overflow-hidden hover:-translate-y-1"
                >
                  <div className="p-6 flex items-center gap-5">
                    <div className="relative">
                      <div className="absolute inset-0 bg-slate-100 rounded-full scale-110"></div>
                      <img
                        src={`https://media.api-sports.io/football/players/${p.player.id}.png`}
                        alt={p.player.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm relative z-10 bg-white"
                        onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=' + p.player.name + '&background=f1f5f9&color=64748b' }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-extrabold text-slate-900 text-lg truncate tracking-tight group-hover:text-blue-600 transition-colors">
                        {p.player.firstname} {p.player.lastname}
                      </p>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1.5 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                        {p.player.nationality}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && !players.length && !stats && (
          <Spinner className="mt-24" size="lg" />
        )}

        {/* Player stats */}
        {stats && (
          <div className="mt-16 w-full animate-fade-in-up">
            <PlayerCard data={stats} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
