import { useState } from "react";
import Spinner from "./Spinner";

function SearchBar({ onSearch, isLoading }) {
  const [player, setPlayer] = useState("");
  const years = ["2024", "2023", "2022"];
  const [season, setSeason] = useState("2024"); // Default to most recent season

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!player.trim()) return;
    onSearch(player, season);
  };

  return (
    <div className="w-full max-w-4xl z-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-2.5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 flex flex-col md:flex-row gap-3 relative hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-shadow duration-300"
      >
        <div className="flex-1 w-full bg-slate-50 rounded-xl relative flex items-center hover:bg-slate-100 transition-colors">
          <div className="absolute left-5 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search player profiles..."
            value={player}
            onChange={(e) => setPlayer(e.target.value)}
            className="w-full bg-transparent border-0 text-slate-800 text-lg focus:ring-0 block pl-14 pr-6 py-4 placeholder-slate-400 font-semibold outline-none"
          />
        </div>

        <div className="w-full md:w-48 shrink-0 bg-slate-50 rounded-xl relative hover:bg-slate-100 transition-colors">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <select
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            className="w-full h-full bg-transparent border-0 text-slate-700 text-base focus:ring-0 block pl-12 pr-10 py-4 font-bold appearance-none cursor-pointer outline-none min-h-[56px]"
          >
            {years.map(y => (
              <option key={y} value={y} className="bg-white text-slate-800 font-medium">{y} / {parseInt(y)+1}</option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !player.trim()}
          className="w-full md:w-auto shrink-0 bg-slate-900 hover:bg-slate-800 text-white font-bold text-base px-8 py-4 rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed group relative overflow-hidden flex items-center justify-center min-w-[140px] min-h-[56px]"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <Spinner size="sm" />
              <span>Analyzing</span>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Explore Data
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          )}
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
