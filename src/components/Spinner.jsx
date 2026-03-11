import React from "react";

const Spinner = ({ size = "lg", className = "" }) => {
  const sizeClasses = size === "sm" ? "w-5 h-5" : "w-16 h-16";
  const iconColorClasses = size === "sm" ? "text-slate-400" : "text-slate-800";
  
  return (
    <div className={`flex flex-col items-center justify-center animate-fade-in ${className}`}>
      <div className={`${sizeClasses} ${iconColorClasses} animate-spin relative`}>
        {/* Subtle drop shadow behind football */}
        {size === "lg" && <div className="absolute inset-0 bg-black/5 rounded-full blur-md"></div>}
        
        {/* Detailed Football SVG */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={size === "sm" ? "2" : "1.5"} strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M9 12l-4.5 -3" />
          <path d="M15 12l4.5 -3" />
          <path d="M10.5 14.5l-2.5 4.5" />
          <path d="M13.5 14.5l2.5 4.5" />
          <path d="M12 9l0 -4" />
        </svg>
      </div>
      {size === "lg" && (
        <p className="mt-6 text-slate-500 font-black uppercase tracking-widest animate-pulse text-sm">Processing Data...</p>
      )}
    </div>
  );
};

export default Spinner;
