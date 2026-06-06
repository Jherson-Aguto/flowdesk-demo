import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/ui/PageHeader';
import { 
  XOctagon, CheckCircle2, 
  Clock, ShieldAlert, Award, ArrowUpRight
} from 'lucide-react';

export const WhyFlowDesk: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <PageHeader
        title="Why FlowDesk?"
        description="Software is just a tool. Outcomes are what run your business. See the FlowDesk difference."
      />

      {/* Before vs After Split Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Before Card */}
        <div className="rounded-2xl border border-red-100 bg-red-50/20 p-6 shadow-xs dark:border-red-950/25 dark:bg-red-950/5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <XOctagon className="h-6 w-6 shrink-0" />
              <h3 className="text-lg font-bold">The Before State</h3>
            </div>
            
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              How most growing businesses manage administrative overhead before centralizing:
            </p>

            <ul className="space-y-3.5 pt-2">
              <li className="flex items-start gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400 text-xs font-bold mt-0.5">!</span>
                <div>
                  <strong className="block text-xs font-bold text-slate-700 dark:text-slate-200">Scattered Excel Sheets</strong>
                  <span className="text-xs text-slate-500">Each employee maintains their own file. Version conflicts, missing client emails, data overwrites.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400 text-xs font-bold mt-0.5">!</span>
                <div>
                  <strong className="block text-xs font-bold text-slate-700 dark:text-slate-200">Messenger / Viber Chats</strong>
                  <span className="text-xs text-slate-500">Clients send slips on chat. Tasks get buried in chat histories; follow-ups are forgotten.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400 text-xs font-bold mt-0.5">!</span>
                <div>
                  <strong className="block text-xs font-bold text-slate-700 dark:text-slate-200">Paper Files & Folders</strong>
                  <span className="text-xs text-slate-500">Retrieving a signed disclosure or tuition waiver requires manually digging through boxes.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400 text-xs font-bold mt-0.5">!</span>
                <div>
                  <strong className="block text-xs font-bold text-slate-700 dark:text-slate-200">Manual Accounting Audits</strong>
                  <span className="text-xs text-slate-500">Invoicing is compiled at the end of the month. Delays cashflows and makes payments hard to trace.</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-8 rounded-xl bg-red-500/5 border border-red-500/10 p-3.5 text-xs text-red-600 dark:text-red-400 font-semibold text-center">
            Result: Stress, lost logs, and limited business scale.
          </div>
        </div>

        {/* After Card */}
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/20 p-6 shadow-xs dark:border-emerald-950/25 dark:bg-emerald-950/5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-6 w-6 shrink-0" />
              <h3 className="text-lg font-bold">The FlowDesk State</h3>
            </div>
            
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              After preloading FlowDesk as your single source of business operations truth:
            </p>

            <ul className="space-y-3.5 pt-2">
              <li className="flex items-start gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 text-xs font-bold mt-0.5">✓</span>
                <div>
                  <strong className="block text-xs font-bold text-slate-700 dark:text-slate-200">Centralized Database Records</strong>
                  <span className="text-xs text-slate-500">Single searchable contact catalog. Instantly link students, patients, or corporate dispatch accounts.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 text-xs font-bold mt-0.5">✓</span>
                <div>
                  <strong className="block text-xs font-bold text-slate-700 dark:text-slate-200">Visual Kanban Pipelines</strong>
                  <span className="text-xs text-slate-500">Every request, enrollment, or ticket progresses through clear stages. Never drop a ball again.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 text-xs font-bold mt-0.5">✓</span>
                <div>
                  <strong className="block text-xs font-bold text-slate-700 dark:text-slate-200">Real-time Document Vetting</strong>
                  <span className="text-xs text-slate-500">Assign document checklists. Instantly filter approved, pending review, or missing files.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 text-xs font-bold mt-0.5">✓</span>
                <div>
                  <strong className="block text-xs font-bold text-slate-700 dark:text-slate-200">Dynamic Billing Status</strong>
                  <span className="text-xs text-slate-500">Issue invoices, record partial payments, and track overdue receivables instantly in one ledger.</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-8 rounded-xl bg-emerald-500/10 border border-emerald-500/15 p-3.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold text-center">
            Result: Centralized visibility, fast workflows, and business clarity.
          </div>
        </div>
      </div>

      {/* Outcome Cards */}
      <div className="grid gap-5 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs soft-shadow dark:border-slate-800 dark:bg-slate-900 space-y-3">
          <div className="h-9 w-9 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-500 flex items-center justify-center">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">80% Less Admin Time</h4>
            <p className="text-xs text-slate-400 mt-1 font-medium">No more digging through folders. Finding files, auditing logs, or looking up bookings takes seconds.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs soft-shadow dark:border-slate-800 dark:bg-slate-900 space-y-3">
          <div className="h-9 w-9 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-500 flex items-center justify-center">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">Zero Missed Follow-ups</h4>
            <p className="text-xs text-slate-400 mt-1 font-medium">Every inquiry starts as a transaction. Kanban assignments keep teams accountable to deadlines.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs soft-shadow dark:border-slate-800 dark:bg-slate-900 space-y-3">
          <div className="h-9 w-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 flex items-center justify-center">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">Premium Brand Appeal</h4>
            <p className="text-xs text-slate-400 mt-1 font-medium">Show clients you operate in a high-fidelity system. Boosts professional appeal and trust.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xs soft-shadow dark:border-slate-800 dark:bg-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">Ready to experience the FlowDesk difference?</h4>
          <p className="text-xs text-slate-400 font-medium">Switch to the dashboard to test the adaptive layouts live.</p>
        </div>
        <Link 
          to="/dashboard"
          className="inline-flex items-center gap-1 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-700 shadow-sm"
        >
          Launch Operations Dashboard <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};
