import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/ui/StatCard';
import { StatusBadge } from '../components/ui/StatusBadge';
import { 
  Users, FileText, CheckCircle2, DollarSign, Calendar, 
  ArrowRight, Activity, Clock, CheckSquare 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, 
  Tooltip, PieChart, Pie, Cell, Legend 
} from 'recharts';

export const Dashboard: React.FC = () => {
  const { records, transactions, workflows, schedule, billing, activityLogs, t, settings } = useApp();

  // Metrics calculations
  const totalRecords = records.length;
  const pendingTransactions = transactions.filter(r => r.status === 'new' || r.status === 'in_progress' || r.status === 'waiting').length;
  const completedThisMonth = transactions.filter(r => r.status === 'completed').length;
  const unpaidBilling = billing.filter(p => p.status === 'unpaid' || p.status === 'overdue').length;
  const todaysSchedule = schedule.filter(s => s.date === '2026-06-06').length;

  // Chart 1: Transactions by Status
  const transactionStatusData = useMemo(() => {
    const statusCounts: Record<string, number> = {
      new: 0,
      in_progress: 0,
      waiting: 0,
      completed: 0,
      cancelled: 0
    };
    
    transactions.forEach(r => {
      if (statusCounts[r.status] !== undefined) {
        statusCounts[r.status]++;
      }
    });

    return Object.entries(statusCounts).map(([key, val]) => ({
      name: t(`transaction`) + ' ' + settings.statusLabels.transaction[key],
      value: val,
      statusKey: key
    }));
  }, [transactions, settings.statusLabels.transaction, t]);

  const COLORS = ['#3b82f6', '#a855f7', '#f59e0b', '#10b981', '#64748b'];

  // Chart 2: Completed operations over time
  const performanceData = [
    { month: 'Jan', completed: 42, target: 45 },
    { month: 'Feb', completed: 58, target: 50 },
    { month: 'Mar', completed: 69, target: 60 },
    { month: 'Apr', completed: 82, target: 70 },
    { month: 'May', completed: 78, target: 75 },
    { month: 'Jun', completed: completedThisMonth + 80, target: 85 }, // Include live completed transactions
  ];

  // Filters
  const urgentWorkflows = useMemo(() => {
    return workflows
      .filter(w => w.status !== 'done')
      .sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      })
      .slice(0, 4);
  }, [workflows]);

  const upcomingSchedule = useMemo(() => {
    return schedule
      .filter(s => s.status === 'scheduled')
      .slice(0, 4);
  }, [schedule]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Intro Header Section */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white shadow-lg shadow-blue-500/10 md:p-8 dark:from-blue-900/60 dark:to-blue-950/60 dark:shadow-none border border-blue-500/15">
        <div className="max-w-2xl">
          <h2 className="text-xl font-bold tracking-tight md:text-3xl">
            Welcome back to your Operations Center
          </h2>
          <p className="mt-2 text-sm text-blue-100/90 leading-relaxed font-medium">
            FlowDesk is a customizable operations platform for small and medium businesses. 
            It helps teams manage records, transactions, schedules, workflows, billing, files, and reports in one place.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-blue-200">
            <span className="rounded-full bg-white/10 px-3 py-1 backdrop-blur-xs">
              📂 Adaptable Modules
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 backdrop-blur-xs">
              ⚡ Real-time Updates
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 backdrop-blur-xs">
              ⚙️ Client-ready Customization
            </span>
          </div>
        </div>
      </div>

      {/* Top Statistic Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title={`Total ${t('recordPlural')}`}
          value={totalRecords}
          icon={Users}
          trend={{ value: '12%', isPositive: true }}
          color="blue"
        />
        <StatCard
          title={`Pending ${t('transactionPlural')}`}
          value={pendingTransactions}
          icon={FileText}
          trend={{ value: '8%', isPositive: false }}
          color="cyan"
        />
        <StatCard
          title="Completed (Month)"
          value={completedThisMonth + 80} // Adding static offset to make it look full
          icon={CheckCircle2}
          trend={{ value: '24%', isPositive: true }}
          color="emerald"
        />
        <StatCard
          title="Outstanding Bills"
          value={unpaidBilling}
          icon={DollarSign}
          trend={{ value: '4%', isPositive: false }}
          color="rose"
        />
        <StatCard
          title="Today's Schedule"
          value={todaysSchedule}
          icon={Calendar}
          color="amber"
          description="June 6, 2026"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Monthly Activity Volume */}
        <div className="md:col-span-2 rounded-2xl border border-slate-100 bg-white p-6 soft-shadow dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-50 pb-4 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Operations Performance
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Volume of completed {t('transactionPlural').toLowerCase()} compared to targets
              </p>
            </div>
          </div>
          <div className="h-64 mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: '1px solid #e2e8f0', 
                    fontSize: '13px',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
                  }} 
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar name="Completed Ops" dataKey="completed" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar name="Monthly Target" dataKey="target" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transactions Status Pie */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 soft-shadow dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-50 pb-4 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {t('transactionPlural')} Breakdown
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              Distribution by lifecycle status
            </p>
          </div>
          <div className="h-56 mt-4 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={transactionStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {transactionStatusData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: '1px solid #e2e8f0',
                    fontSize: '12px' 
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Custom Legends list to conserve space */}
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs font-semibold">
            {transactionStatusData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5 overflow-hidden">
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                <span className="truncate text-slate-500 dark:text-slate-400">{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Internal operational list grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Left Column: Urgent Workflows */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 soft-shadow dark:border-slate-800 dark:bg-slate-900 flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-50 pb-4 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <CheckSquare className="h-4.5 w-4.5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Action Workflows
              </h3>
            </div>
            <Link 
              to="/workflows" 
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-0.5 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Manage Workflows <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="mt-4 flex-1 space-y-3">
            {urgentWorkflows.length > 0 ? (
              urgentWorkflows.map((workflow) => (
                <div 
                  key={workflow.id} 
                  className="flex items-center justify-between rounded-xl border border-slate-50 bg-slate-50/20 p-3.5 dark:border-slate-800/40 dark:bg-slate-900/50"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      {workflow.title}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-400">
                      <span>To: {workflow.assignedTo}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> Due {workflow.deadline}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <StatusBadge type="priority" status={workflow.priority} />
                    <StatusBadge type="task" status={workflow.status} />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-sm text-slate-400 dark:text-slate-500 py-8">
                All operational tasks are completed!
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Upcoming Schedule */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 soft-shadow dark:border-slate-800 dark:bg-slate-900 flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-50 pb-4 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Calendar className="h-4.5 w-4.5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Upcoming Schedule
              </h3>
            </div>
            <Link 
              to="/schedule" 
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-0.5 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View Schedule <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="mt-4 flex-1 space-y-3">
            {upcomingSchedule.length > 0 ? (
              upcomingSchedule.map((evt) => (
                <div 
                  key={evt.id} 
                  className="flex items-center justify-between rounded-xl border border-slate-50 bg-slate-50/20 p-3.5 dark:border-slate-800/40 dark:bg-slate-900/50"
                >
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      {evt.title}
                    </p>
                    <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mt-0.5">
                      {evt.clientName ? `${t('record')}: ${evt.clientName} • ` : ''}Staff: {evt.assignedStaff}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs font-bold text-slate-700 dark:text-slate-350">
                      {evt.date}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400">
                      {evt.time}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-sm text-slate-400 dark:text-slate-500 py-8">
                No events currently on the calendar.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Activity Log */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 soft-shadow dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-2 border-b border-slate-50 pb-4 dark:border-slate-800">
          <Activity className="h-4.5 w-4.5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            System Operations Log
          </h3>
        </div>
        <div className="mt-4 divide-y divide-slate-50 dark:divide-slate-800/60 max-h-64 overflow-y-auto pr-1">
          {activityLogs.map((log) => {
            const dotColor = {
              success: 'bg-emerald-500',
              info: 'bg-blue-500',
              warning: 'bg-amber-500',
              danger: 'bg-rose-500'
            }[log.type] || 'bg-slate-500';

            return (
              <div key={log.id} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dotColor}`} />
                  <div>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-350">
                      {log.action}
                    </p>
                    <p className="text-xs text-slate-400 font-medium">
                      {log.details}
                    </p>
                  </div>
                </div>
                <div className="mt-1 pl-5 text-right sm:mt-0 sm:pl-0">
                  <span className="block text-[10px] font-bold text-slate-400 select-none">
                    {log.user}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400/80">
                    {log.timestamp}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
