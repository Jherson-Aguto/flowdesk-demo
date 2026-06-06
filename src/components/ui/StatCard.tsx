import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: 'blue' | 'emerald' | 'amber' | 'cyan' | 'rose' | 'sky';
  description?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  color = 'blue',
  description
}) => {
  const colorMap = {
    blue: 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/10',
    emerald: 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/10',
    amber: 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/10',
    cyan: 'text-cyan-600 bg-cyan-50 dark:text-cyan-400 dark:bg-cyan-950/20 border-cyan-100 dark:border-cyan-900/10',
    rose: 'text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900/10',
    sky: 'text-sky-600 bg-sky-50 dark:text-sky-400 dark:bg-sky-950/20 border-sky-100 dark:border-sky-900/10',
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xs hover-lift soft-shadow dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        {/* Metric Label & Title */}
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {title}
          </p>
          <h3 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100 md:text-3xl">
            {value}
          </h3>
        </div>

        {/* Brand Icon Badge */}
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${colorMap[color]}`}>
          <Icon className="h-6 w-6 shrink-0" />
        </div>
      </div>

      {/* Trend Summary */}
      {(trend || description) && (
        <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-4 dark:border-slate-800/55">
          {trend ? (
            <div className="flex items-center gap-1.5">
              <span className={`flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-semibold
                ${trend.isPositive 
                  ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400' 
                  : 'bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400'
                }
              `}>
                {trend.isPositive ? (
                  <ArrowUpRight className="h-3 w-3 inline" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 inline" />
                )}
                {trend.value}
              </span>
              <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                vs last month
              </span>
            </div>
          ) : (
            <div />
          )}

          {description && (
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
