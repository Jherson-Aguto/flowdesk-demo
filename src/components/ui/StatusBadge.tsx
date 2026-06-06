import React from 'react';

interface StatusBadgeProps {
  type: 'request' | 'payment' | 'document' | 'task' | 'priority' | 'client';
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ type, status }) => {
  const normalizedStatus = status.toLowerCase().replace(/\s+/g, '_');

  const getStyles = () => {
    // Priority Badges
    if (type === 'priority') {
      switch (normalizedStatus) {
        case 'high':
          return 'bg-red-50 text-red-700 border-red-100 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/10';
        case 'medium':
          return 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/10';
        case 'low':
        default:
          return 'bg-slate-50 text-slate-600 border-slate-100 dark:bg-slate-800/40 dark:text-slate-400 dark:border-slate-800/50';
      }
    }

    // Client Status Badges
    if (type === 'client') {
      switch (normalizedStatus) {
        case 'active':
          return 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/10';
        case 'lead':
          return 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/10';
        case 'inactive':
        default:
          return 'bg-slate-50 text-slate-500 border-slate-100 dark:bg-slate-800/40 dark:text-slate-400 dark:border-slate-800/50';
      }
    }

    // Request Status Badges
    if (type === 'request') {
      switch (normalizedStatus) {
        case 'new':
          return 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/10';
        case 'in_progress':
          return 'bg-cyan-50 text-cyan-700 border-cyan-100 dark:bg-cyan-950/20 dark:text-cyan-400 dark:border-cyan-900/10';
        case 'waiting':
          return 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/10';
        case 'completed':
          return 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/10';
        case 'cancelled':
        default:
          return 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800/60 dark:text-slate-400 dark:border-slate-700/55';
      }
    }

    // Task Status Badges
    if (type === 'task') {
      switch (normalizedStatus) {
        case 'todo':
          return 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/10';
        case 'in_progress':
          return 'bg-cyan-50 text-cyan-700 border-cyan-100 dark:bg-cyan-950/20 dark:text-cyan-400 dark:border-cyan-900/10';
        case 'review':
          return 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/10';
        case 'done':
          return 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/10';
        default:
          return 'bg-slate-50 text-slate-500 border-slate-100 dark:bg-slate-800/40 dark:text-slate-400 dark:border-slate-800/50';
      }
    }

    // Payment Status Badges
    if (type === 'payment') {
      switch (normalizedStatus) {
        case 'paid':
          return 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/10';
        case 'partial':
        case 'partial_payment':
          return 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/10';
        case 'unpaid':
          return 'bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/10';
        case 'overdue':
          return 'bg-red-50 text-red-700 border-red-100 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/10';
        case 'refunded':
        default:
          return 'bg-slate-50 text-slate-500 border-slate-100 dark:bg-slate-800/40 dark:text-slate-400 dark:border-slate-800/50';
      }
    }

    // Document Status Badges
    if (type === 'document') {
      switch (normalizedStatus) {
        case 'approved':
          return 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/10';
        case 'submitted':
          return 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/10';
        case 'for_review':
        case 'under_review':
          return 'bg-cyan-50 text-cyan-700 border-cyan-100 dark:bg-cyan-950/20 dark:text-cyan-400 dark:border-cyan-900/10';
        case 'required':
          return 'bg-red-50 text-red-700 border-red-100 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/10';
        case 'released':
        default:
          return 'bg-slate-50 text-slate-500 border-slate-100 dark:bg-slate-800/40 dark:text-slate-400 dark:border-slate-800/50';
      }
    }

    return 'bg-slate-50 text-slate-600 border-slate-100 dark:bg-slate-850 dark:text-slate-300';
  };

  const formatText = (text: string) => {
    return text
      .split(/[_-]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold select-none ${getStyles()}`}>
      {formatText(status)}
    </span>
  );
};
