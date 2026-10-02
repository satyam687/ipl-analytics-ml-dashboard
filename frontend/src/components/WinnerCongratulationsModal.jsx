import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Crown, Medal, Sparkles, MapPin, Award, CheckCircle2 } from 'lucide-react';

export default function WinnerCongratulationsModal({ seasonData, onCelebrate }) {
  useEffect(() => {
    if (seasonData?.winner_team) {
      triggerConfetti();
    }
  }, [seasonData?.year, seasonData?.winner_team]);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#3b82f6', '#ec4899', '#10b981', '#ffffff']
      });
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#f59e0b', '#fbbf24', '#fef08a']
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#f59e0b', '#fbbf24', '#fef08a']
        });
      }, 250);
    } catch (e) {
      console.log('Confetti effect executed');
    }
  };

  if (!seasonData) return null;

  const teamThemeColor = seasonData.theme_color || '#f59e0b';

  return (
    <div className="relative overflow-hidden rounded-3xl mb-8 p-6 md:p-8 glass-card border border-amber-500/30 shadow-2xl glow-champion">
      {/* Background ambient lighting */}
      <div
        className="absolute inset-0 opacity-20 blur-3xl pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${teamThemeColor}, transparent 70%)` }}
      />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Trophy & Champion Details */}
        <div className="flex-1 space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span>IPL {seasonData.year} CHAMPIONS ANNOUNCEMENT</span>
          </div>

          <div className="space-y-1">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white flex flex-wrap items-center justify-center md:justify-start gap-3">
              <span>{seasonData.winner_team}</span>
              <Crown className="w-8 h-8 md:w-10 md:h-10 text-amber-400 inline-block animate-bounce" />
            </h2>
            <p className="text-sm md:text-lg font-medium text-amber-200/90 leading-relaxed italic">
              "{seasonData.congratulation_message}"
            </p>
          </div>

          {/* Quick Winner Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-gray-900/80 border border-gray-800">
              <span className="text-xs text-gray-400 block font-medium">Runner-Up Team</span>
              <span className="text-sm font-bold text-gray-200 flex items-center gap-1 mt-0.5">
                <Medal className="w-4 h-4 text-gray-400" />
                {seasonData.runner_up}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-gray-900/80 border border-gray-800">
              <span className="text-xs text-gray-400 block font-medium">Player of Season</span>
              <span className="text-sm font-bold text-amber-300 flex items-center gap-1 mt-0.5">
                <Award className="w-4 h-4 text-amber-400" />
                {seasonData.player_of_season}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-gray-900/80 border border-gray-800 col-span-2 sm:col-span-1">
              <span className="text-xs text-gray-400 block font-medium">Final Margin</span>
              <span className="text-sm font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {seasonData.final_margin}
              </span>
            </div>
          </div>
        </div>

        {/* Right Trophy Graphics & Celebrate Button */}
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="relative p-6 rounded-3xl bg-gradient-to-b from-amber-500/20 via-yellow-500/10 to-transparent border border-amber-500/30 text-center animate-float">
            <Trophy className="w-24 h-24 md:w-32 md:h-32 text-amber-400 drop-shadow-[0_10px_20px_rgba(245,158,11,0.5)]" />
            <div className="mt-2 text-xs font-black tracking-widest text-amber-300 uppercase">
              {seasonData.winner_code} • CHAMPIONS {seasonData.year}
            </div>
          </div>

          <button
            onClick={triggerConfetti}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-950 font-extrabold text-xs md:text-sm tracking-wide shadow-lg shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            CELEBRATE VICTORY AGAIN! 🎉
          </button>
        </div>

      </div>
    </div>
  );
}
