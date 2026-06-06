import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, Users, FileText, CheckSquare, Calendar, 
  CreditCard, FolderOpen, BarChart3, Settings, Sparkles, X 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { settings, t } = useApp();

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/records', label: t('recordPlural'), icon: Users },
    { to: '/transactions', label: t('transactionPlural'), icon: FileText },
    { to: '/workflows', label: 'Workflows', icon: CheckSquare },
    { to: '/schedule', label: 'Schedule', icon: Calendar },
    { to: '/billing', label: 'Billing', icon: CreditCard },
    { to: '/files', label: 'Files', icon: FolderOpen },
    { to: '/reports', label: 'Reports & Export', icon: BarChart3 },
    { to: '/why-flowdesk', label: 'Why FlowDesk?', icon: Sparkles },
    { to: '/sales-deck', label: 'Sales Pitch Deck', icon: FileText },
    { to: '/settings', label: 'System Settings', icon: Settings },
  ];

  // Map industry profile names to nice user badges
  const getIndustryBadgeColor = () => {
    switch (settings.industryType) {
      case 'training': return 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20';
      case 'clinic': return 'bg-blue-500/10 text-blue-600 border border-blue-500/20';
      case 'logistics': return 'bg-amber-500/10 text-amber-600 border border-amber-500/20';
      case 'distributor': return 'bg-cyan-500/10 text-cyan-600 border border-cyan-500/20';
      case 'service': return 'bg-sky-500/10 text-sky-600 border border-sky-500/20';
      default: return 'bg-slate-500/10 text-slate-600 border border-slate-500/20';
    }
  };

  const getIndustryLabel = () => {
    return settings.industryType.charAt(0).toUpperCase() + settings.industryType.slice(1);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <aside className={`
        fixed bottom-0 top-0 left-0 z-50 flex w-72 flex-col 
        border-r border-slate-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0
        dark:border-slate-800 dark:bg-slate-900/95 dark:backdrop-blur-md
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-6 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/30">
              <Sparkles className="h-5.5 w-5.5 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
                FlowDesk
              </h1>
              <p className="text-[9px] text-slate-400 font-bold tracking-wider uppercase">
                by CoreLoop Solutions
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => setIsOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-100 text-slate-500 lg:hidden hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Industry Indicator Badge */}
        <div className="px-6 py-4">
          <div className={`flex flex-col gap-1 rounded-xl p-3.5 ${getIndustryBadgeColor()}`}>
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-75">
              Current Template
            </span>
            <span className="text-sm font-semibold tracking-tight">
              {getIndustryLabel()} Profile
            </span>
          </div>
        </div>

        {/* Scrollable Navigation */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto px-4 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 dark:shadow-none' 
                    : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/60'
                  }
                `}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-slate-100 p-6 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-100 border border-slate-200 dark:bg-slate-800 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold">
              AU
            </div>
            <div className="overflow-hidden">
              <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-200">
                Admin User
              </p>
              <p className="truncate text-xs text-slate-400 font-medium">
                ops-admin@flowdesk.io
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
