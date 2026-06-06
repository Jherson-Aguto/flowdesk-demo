import React from 'react';
import { Menu, Bell, Search, Sparkles, UserCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface TopbarProps {
  onMenuToggle: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onMenuToggle }) => {
  const { settings } = useApp();

  const getIndustryColor = () => {
    switch (settings.industryType) {
      case 'training': return 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20';
      case 'clinic': return 'text-blue-500 bg-blue-50 dark:bg-blue-950/20';
      case 'logistics': return 'text-amber-500 bg-amber-50 dark:bg-amber-950/20';
      case 'distributor': return 'text-cyan-500 bg-cyan-50 dark:bg-cyan-950/20';
      case 'service': return 'text-sky-500 bg-sky-50 dark:bg-sky-950/20';
      default: return 'text-slate-500 bg-slate-50 dark:bg-slate-950/20';
    }
  };

  const getIndustryLabel = () => {
    switch (settings.industryType) {
      case 'training': return 'Training Profile';
      case 'clinic': return 'Clinical Profile';
      case 'logistics': return 'Logistics Profile';
      case 'distributor': return 'Distributor Profile';
      case 'service': return 'Service Agency Profile';
      default: return 'General Operations Profile';
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-100 bg-white/80 px-6 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
      {/* Left Area: Mobile Menu Toggle & Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 lg:hidden hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <Menu className="h-5.5 w-5.5" />
        </button>

        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-3">
          <span className="text-base font-bold text-slate-800 dark:text-slate-100 md:text-lg">
            {settings.businessName}
          </span>
          <div className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${getIndustryColor()}`}>
            <Sparkles className="h-3.5 w-3.5 shrink-0" />
            <span>{getIndustryLabel()}</span>
          </div>
        </div>
      </div>

      {/* Right Area: Search, Notifications, Avatar */}
      <div className="flex items-center gap-4">
        {/* Mock Search (Visual Only) */}
        <div className="relative hidden w-64 md:block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            placeholder="Search records..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pr-4 pl-9 text-sm text-slate-600 outline-none transition-all focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-300 dark:focus:border-blue-500 dark:focus:bg-slate-950"
          />
        </div>

        {/* Notifications Icon */}
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-100 text-slate-500 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* User Status Tag & Mini Avatar */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-100 dark:border-slate-800">
          <div className="hidden flex-col text-right sm:flex">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
              Ops Desk
            </span>
            <span className="text-[10px] font-medium text-slate-400 flex items-center gap-0.5 justify-end">
              <UserCheck className="h-3 w-3 text-emerald-500" /> Online
            </span>
          </div>
          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-600 to-blue-700 text-white font-bold flex items-center justify-center text-sm shadow-sm">
            FD
          </div>
        </div>
      </div>
    </header>
  );
};
