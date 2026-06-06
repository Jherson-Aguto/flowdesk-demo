import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/ui/PageHeader';
import { DataTable } from '../components/ui/DataTable';
import type { Column } from '../components/ui/DataTable';
import { 
  FileSpreadsheet, FileText, Printer, SlidersHorizontal, 
  Check, RefreshCw 
} from 'lucide-react';
import type { TransactionItem } from '../types';

export const Reports: React.FC = () => {
  const { transactions, settings, t } = useApp();

  // Filters State
  const [dateRange, setDateRange] = useState('30');
  const [status, setStatus] = useState('all');
  const [serviceType, setServiceType] = useState('all');
  const [assignedStaff, setAssignedStaff] = useState('all');
  
  // Notification Banner State
  const [bannerText, setBannerText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Dynamic filter items list
  const staffOptions = useMemo(() => {
    const list = new Set(transactions.map(r => r.assignedStaff));
    return Array.from(list);
  }, [transactions]);

  const serviceOptions = useMemo(() => {
    const list = new Set(transactions.map(r => r.serviceType));
    return Array.from(list);
  }, [transactions]);

  // Aggregate Data
  const filteredReportData = useMemo(() => {
    return transactions.filter(req => {
      // 1. Status Filter
      if (status !== 'all' && req.status !== status) return false;
      
      // 2. Service Filter
      if (serviceType !== 'all' && req.serviceType !== serviceType) return false;
      
      // 3. Staff Filter
      if (assignedStaff !== 'all' && req.assignedStaff !== assignedStaff) return false;

      // 4. Date Filter (Mock based on days from current 2026-06-06 date)
      if (dateRange !== 'all') {
        const reqDate = new Date(req.dateCreated);
        const refDate = new Date('2026-06-06');
        const diffTime = Math.abs(refDate.getTime() - reqDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays > parseInt(dateRange)) return false;
      }

      return true;
    });
  }, [transactions, status, serviceType, assignedStaff, dateRange]);

  // Operational aggregates
  const aggregates = useMemo(() => {
    const total = filteredReportData.length;
    const completed = filteredReportData.filter(r => r.status === 'completed').length;
    const pending = filteredReportData.filter(r => r.status === 'in_progress' || r.status === 'new').length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, pending, completionRate };
  }, [filteredReportData]);

  // Export Simulator Trigger
  const triggerExport = (format: 'CSV' | 'PDF' | 'Print') => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      let msg = '';
      if (format === 'CSV') {
        msg = `Success! Exported ${filteredReportData.length} records to FlowDesk_Report_${Date.now().toString().slice(-4)}.csv`;
      } else if (format === 'PDF') {
        msg = `Success! Generated PDF document with ${filteredReportData.length} pages. Download started.`;
      } else {
        msg = `Opening system print dialogue for ${filteredReportData.length} active logs...`;
      }
      setBannerText(msg);
      setTimeout(() => setBannerText(null), 5000);
    }, 800);
  };

  const columns: Column<TransactionItem>[] = [
    {
      header: 'ID',
      accessor: 'id',
      className: 'w-24 font-mono font-semibold'
    },
    {
      header: t('record'),
      accessor: 'clientName',
      className: 'font-bold text-slate-800 dark:text-slate-100'
    },
    {
      header: t('service'),
      accessor: 'serviceType',
      className: 'font-semibold text-xs text-slate-500'
    },
    {
      header: 'Status',
      accessor: (item) => (
        <span className="text-xs font-semibold select-none capitalize">
          {settings.statusLabels.transaction[item.status] || item.status}
        </span>
      )
    },
    {
      header: t('assignedStaff'),
      accessor: 'assignedStaff',
      className: 'font-medium'
    },
    {
      header: 'Created Date',
      accessor: 'dateCreated',
      className: 'text-xs text-slate-400 font-medium'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <PageHeader
        title="Reports & Analytics"
        description="Filter operations parameters and run simulation reports for CSV, PDF, and Print layouts."
      />

      {/* Export status banner */}
      {bannerText && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3.5 text-sm font-semibold text-emerald-700 flex items-center gap-2 dark:bg-emerald-950/20 dark:border-emerald-900/10 dark:text-emerald-400 animate-in slide-in-from-top-4 duration-250 select-none">
          <Check className="h-4.5 w-4.5 shrink-0" />
          <span>{bannerText}</span>
        </div>
      )}

      {/* Analytics Aggregate Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs soft-shadow dark:border-slate-800 dark:bg-slate-900">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Filtered Count</span>
          <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">{aggregates.total} {t('transactionPlural')}</h4>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs soft-shadow dark:border-slate-800 dark:bg-slate-900">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Completed Operations</span>
          <h4 className="text-2xl font-bold text-emerald-600 mt-1">{aggregates.completed} Done</h4>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs soft-shadow dark:border-slate-800 dark:bg-slate-900">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Pending Operations</span>
          <h4 className="text-2xl font-bold text-cyan-600 mt-1">{aggregates.pending} Active</h4>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs soft-shadow dark:border-slate-800 dark:bg-slate-900">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Completion Rate</span>
          <h4 className="text-2xl font-bold text-blue-600 mt-1">{aggregates.completionRate}% Rate</h4>
        </div>
      </div>

      {/* Filter Options Panel */}
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs soft-shadow dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-1.5 border-b border-slate-50 pb-3 dark:border-slate-800 text-slate-700 dark:text-slate-200">
          <SlidersHorizontal className="h-4.5 w-4.5 text-blue-500" />
          <h3 className="text-sm font-bold">Report Settings Filters</h3>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
              Date Period
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
            >
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">Last 90 Days</option>
              <option value="all">All Time</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
              Workflow Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
            >
              <option value="all">All Statuses</option>
              {Object.entries(settings.statusLabels.transaction).map(([key, val]) => (
                <option key={key} value={key}>{val}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
              {t('service')} Category
            </label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
            >
              <option value="all">All Types</option>
              {serviceOptions.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
              Staff Vetted
            </label>
            <select
              value={assignedStaff}
              onChange={(e) => setAssignedStaff(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
            >
              <option value="all">All Staff</option>
              {staffOptions.map(staff => (
                <option key={staff} value={staff}>{staff}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Action simulators bar */}
        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-50 pt-4 dark:border-slate-800/60 justify-end">
          <button
            disabled={loading}
            onClick={() => triggerExport('CSV')}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 select-none cursor-pointer"
          >
            {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <FileSpreadsheet className="h-4 w-4 text-emerald-500" />}
            <span>Export CSV</span>
          </button>
          <button
            disabled={loading}
            onClick={() => triggerExport('PDF')}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 select-none cursor-pointer"
          >
            {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4 text-rose-500" />}
            <span>Export PDF</span>
          </button>
          <button
            disabled={loading}
            onClick={() => triggerExport('Print')}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 select-none cursor-pointer"
          >
            {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Printer className="h-4 w-4 text-blue-500" />}
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Aggregated Output Data list */}
      <DataTable
        data={filteredReportData}
        columns={columns}
        searchPlaceholder="Filter result list..."
        emptyMessage="No operations match the selected report parameters."
      />
    </div>
  );
};
