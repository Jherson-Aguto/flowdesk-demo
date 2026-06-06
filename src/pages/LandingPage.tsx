import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, CheckCircle, ArrowRight, Layers, PhoneCall, Check,
  Zap, Play
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<'training' | 'clinic' | 'logistics' | 'distributor' | 'service'>('clinic');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const industries = [
    { id: 'clinic' as const, name: 'Medical Clinic', record: 'Patients', trans: 'Appointments', task: 'Patient Care' },
    { id: 'training' as const, name: 'Training Center', record: 'Students', trans: 'Enrollments', task: 'Class Scheduling' },
    { id: 'logistics' as const, name: 'Logistics / Dispatch', record: 'Shippers & Clients', trans: 'Shipment Bookings', task: 'Route Transit' },
    { id: 'distributor' as const, name: 'Distribution / Wholesaler', record: 'Retailer Accounts', trans: 'Purchase Orders', task: 'Inventory Pack' },
    { id: 'service' as const, name: 'Professional Services', record: 'Clients', trans: 'Service Tickets', task: 'Audit & Reviews' },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
      setCompany('');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_40%)] pointer-events-none" />
      <div className="absolute top-[30%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-emerald-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between border-b border-slate-900">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-500/30">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight text-white">FlowDesk</span>
              <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-widest leading-none">by CoreLoop Solutions</span>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <Link to="/why-flowdesk" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">
              Why FlowDesk?
            </Link>
            <Link 
              to="/dashboard" 
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all hover:scale-102"
            >
              <Play className="h-3.5 w-3.5 fill-current" /> Launch Live Demo
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-20 lg:px-8 text-center lg:text-left lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-400 border border-blue-500/20">
            <Zap className="h-3.5 w-3.5" /> Core Platform with Adaptive Vocabulary
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            FlowDesk — Modular Business <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400">Operations Platform</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
            Replace spreadsheets, Messenger threads, and disconnected tools with a unified operations workspace. Adapt terminology dynamically to your specific industry.
          </p>

          {/* Value Checklist */}
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto lg:mx-0 pt-2 text-left font-semibold text-sm">
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle className="h-4.5 w-4.5 text-blue-500 shrink-0" />
              <span>Records (People/Entities)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle className="h-4.5 w-4.5 text-blue-500 shrink-0" />
              <span>Transactions (Bookings/Tickets)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle className="h-4.5 w-4.5 text-blue-500 shrink-0" />
              <span>Workflows (Custom Kanban)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle className="h-4.5 w-4.5 text-blue-500 shrink-0" />
              <span>Billing & Invoices</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle className="h-4.5 w-4.5 text-blue-500 shrink-0" />
              <span>Files & Document Audits</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle className="h-4.5 w-4.5 text-blue-500 shrink-0" />
              <span>Reports & Exports</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <Link 
              to="/dashboard" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all hover:translate-y-[-1px]"
            >
              Enter Live Demo <ArrowRight className="h-4.5 w-4.5" />
            </Link>
            <Link 
              to="/why-flowdesk" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-6 py-3.5 text-sm font-bold text-slate-300 hover:bg-slate-900 hover:text-white transition-all"
            >
              Compare Outcomes
            </Link>
          </div>
        </div>

        {/* Hero Interactive Screen Preview mockup */}
        <div className="mt-16 lg:mt-0 lg:col-span-6 flex justify-center">
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-2xl shadow-blue-500/5 backdrop-blur-xs">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[10px] font-mono text-slate-500">app.flowdesk.io/records</span>
            </div>

            {/* Dashboard Mock View */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-400">Workspace Data</h4>
                  <p className="text-sm font-bold text-white">Northbridge Medical Services</p>
                </div>
                <span className="rounded-full bg-blue-500/10 border border-blue-500/25 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">
                  Clinic Active
                </span>
              </div>

              {/* Mock Record table rows */}
              <div className="space-y-2.5 pt-2">
                <div className="rounded-xl bg-slate-950 p-3 flex items-center justify-between border border-slate-800/60">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-xs">PD</div>
                    <div>
                      <span className="block text-xs font-bold text-white">Pedro Penduko</span>
                      <span className="block text-[10px] text-slate-500">Outpatient / Cardiology</span>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[9px] font-semibold text-emerald-400">Active Patient</span>
                </div>

                <div className="rounded-xl bg-slate-950 p-3 flex items-center justify-between border border-slate-800/60">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-xs">CC</div>
                    <div>
                      <span className="block text-xs font-bold text-white">Clara Clara</span>
                      <span className="block text-[10px] text-slate-500">Pediatric Consult</span>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[9px] font-semibold text-emerald-400">Active Patient</span>
                </div>
              </div>

              {/* Mock Activity chart representation */}
              <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/60 space-y-2">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
                  <span>WEEKLY COMPLETED APPOINTMENTS</span>
                  <span className="text-emerald-400">89% COMPLETED</span>
                </div>
                <div className="flex gap-2 items-end h-16 pt-2">
                  <div className="w-full bg-blue-600/40 rounded-t-sm h-[30%]" />
                  <div className="w-full bg-blue-600/40 rounded-t-sm h-[50%]" />
                  <div className="w-full bg-blue-600/60 rounded-t-sm h-[40%]" />
                  <div className="w-full bg-blue-600/80 rounded-t-sm h-[75%]" />
                  <div className="w-full bg-blue-600 rounded-t-sm h-[90%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Support Adapter Selector */}
      <section className="relative z-10 bg-slate-900/40 border-t border-b border-slate-900/80 py-20 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Industries We Support</h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Our dynamic translation engine translates application terminology automatically. Select a profile below to preview changes.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-12 items-start">
            {/* Industry selector buttons */}
            <div className="lg:col-span-5 space-y-2">
              {industries.map((ind) => (
                <button
                  key={ind.id}
                  onClick={() => setSelectedIndustry(ind.id)}
                  className={`w-full text-left rounded-xl p-4 transition-all flex items-center justify-between border ${
                    selectedIndustry === ind.id 
                      ? 'bg-blue-600/10 border-blue-500/40 text-white shadow-lg shadow-blue-500/5' 
                      : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center font-bold ${
                      selectedIndustry === ind.id ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      <Layers className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <span className="block text-sm font-bold">{ind.name}</span>
                      <span className="block text-[10px] opacity-75">Vocabulary Preset</span>
                    </div>
                  </div>
                  {selectedIndustry === ind.id && <Check className="h-4 w-4 text-blue-400" />}
                </button>
              ))}
            </div>

            {/* Translation preview mockup */}
            <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-xl relative overflow-hidden min-h-[300px]">
              <div className="absolute top-0 right-0 p-3 text-[10px] text-blue-400 font-mono font-bold bg-blue-500/10 rounded-bl-xl border-l border-b border-slate-800">
                ACTIVE PRESIGN
              </div>

              <h3 className="text-base font-bold text-white mb-6">Interactive Vocabulary Switcher</h3>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-900 bg-slate-900/40 p-4 space-y-1">
                  <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Customer Registry</span>
                  <span className="text-base font-extrabold text-blue-400">
                    {industries.find(i => i.id === selectedIndustry)?.record}
                  </span>
                  <p className="text-xs text-slate-400">The primary people/companies you serve.</p>
                </div>

                <div className="rounded-xl border border-slate-900 bg-slate-900/40 p-4 space-y-1">
                  <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Operational Transaction</span>
                  <span className="text-base font-extrabold text-blue-400">
                    {industries.find(i => i.id === selectedIndustry)?.trans}
                  </span>
                  <p className="text-xs text-slate-400">The core tickets, bookings or appointments.</p>
                </div>

                <div className="rounded-xl border border-slate-900 bg-slate-900/40 p-4 space-y-1">
                  <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Primary Tasks</span>
                  <span className="text-base font-extrabold text-sky-400">
                    {industries.find(i => i.id === selectedIndustry)?.task}
                  </span>
                  <p className="text-xs text-slate-400">The stages of workflow execution and targets.</p>
                </div>

                <div className="rounded-xl border border-slate-900 bg-slate-900/40 p-4 flex flex-col justify-center items-center text-center">
                  <span className="text-xs text-slate-400 font-bold mb-2">Simulate on Live Dashboard</span>
                  <Link 
                    to="/dashboard" 
                    className="inline-flex items-center gap-1 text-xs font-bold bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 shadow-md shadow-blue-500/10"
                  >
                    Launch Demo <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discovery CTA Lead Capture Section */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-20 lg:px-8">
        <div className="rounded-3xl border border-slate-900 bg-gradient-to-b from-slate-900 to-slate-950 p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_60%)] pointer-events-none" />
          
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/15">
            <PhoneCall className="h-5 w-5" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Ready for a Custom Setup?</h2>
            <p className="text-sm text-slate-400 max-w-lg mx-auto">
              Tell us about your business. We will setup FlowDesk with custom workflow stages and terminology matching your organization in 1 week.
            </p>
          </div>

          {submitted ? (
            <div className="max-w-md mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-4 text-emerald-400 text-sm font-semibold animate-in zoom-in-95 duration-200">
              ✓ Submission received! CoreLoop Solutions will reach out to you within 24 hours.
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Your Company Name"
                className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500 focus:bg-slate-950 transition-colors"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="work-email@company.com"
                className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500 focus:bg-slate-950 transition-colors"
                required
              />
              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700 shadow-md shadow-blue-500/25 transition-all select-none cursor-pointer"
              >
                Submit Request
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900/60 py-8 text-center text-xs text-slate-500">
        <p>© 2026 FlowDesk. All rights reserved.</p>
        <p className="mt-1 font-semibold text-slate-600">Built with Passion by CoreLoop Solutions</p>
      </footer>
    </div>
  );
};
