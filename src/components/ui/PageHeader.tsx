import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  action
}) => {
  const ActionIcon = action?.icon;

  return (
    <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800/60">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100 md:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm font-medium text-slate-400 dark:text-slate-500">
            {description}
          </p>
        )}
      </div>

      {action && (
        <button
          onClick={action.onClick}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transition-all select-none"
        >
          {ActionIcon && <ActionIcon className="h-4.5 w-4.5" />}
          <span>{action.label}</span>
        </button>
      )}
    </div>
  );
};
