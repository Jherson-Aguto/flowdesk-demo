import React, { useState } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { 
  ChevronLeft, ChevronRight, Presentation, Award, 
  Target, Settings, DollarSign, Users2, AlertCircle
} from 'lucide-react';

export const SalesDeck: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const slides = [
    {
      title: '1. Who We Are',
      subtitle: 'CoreLoop Solutions — Custom Operations Systems',
      content: (
        <div className="space-y-6 pt-2">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
            We are a digital studio focused on replacing chaotic administrative workflows with automated operation workspaces. We believe software should adapt to your business, not the other way around.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 pt-2">
            <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/40 space-y-2">
              <Users2 className="h-5 w-5 text-blue-500" />
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase">Operational Expertise</h4>
              <p className="text-xs text-slate-400">We work directly with review centers, clinics, logistics companies, and distributors to audit their workflows.</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/40 space-y-2">
              <Award className="h-5 w-5 text-emerald-500" />
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase">Outcome Driven</h4>
              <p className="text-xs text-slate-400">Our goal is to save admins 10-20 hours per week and prevent client churn by eliminating dropped tasks.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: '2. The Gaps We Solve',
      subtitle: 'The Chaotic Status Quo of Growing Businesses',
      content: (
        <div className="space-y-6 pt-2">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold">
            Most businesses grow using whatever tools are free or already open, creating friction:
          </p>
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-3 rounded-lg border border-red-100 bg-red-50/30 px-3.5 py-2.5 dark:border-red-950/20 dark:bg-red-950/5">
              <AlertCircle className="h-4.5 w-4.5 text-red-500 shrink-0" />
              <div className="text-xs">
                <strong className="text-slate-700 dark:text-slate-200">Chaotic Messaging Logs</strong>: Tuition receipts, patient charts, or delivery waivers lost in chat threads.
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-red-100 bg-red-50/30 px-3.5 py-2.5 dark:border-red-950/20 dark:bg-red-950/5">
              <AlertCircle className="h-4.5 w-4.5 text-red-500 shrink-0" />
              <div className="text-xs">
                <strong className="text-slate-700 dark:text-slate-200">Version-control Conflicts</strong>: Multiple managers editing client Google Sheets simultaneously leading to corrupt states.
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-red-100 bg-red-50/30 px-3.5 py-2.5 dark:border-red-950/20 dark:bg-red-950/5">
              <AlertCircle className="h-4.5 w-4.5 text-red-500 shrink-0" />
              <div className="text-xs">
                <strong className="text-slate-700 dark:text-slate-200">Delayed Billing & Invoicing</strong>: Manual billing audit cycles deferring cash collections for weeks.
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: '3. Our Solution: FlowDesk',
      subtitle: 'A Modular Base Adapting Instantly to Your Vocabulary',
      content: (
        <div className="space-y-6 pt-2">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
            Instead of building custom software from scratch (which costs $10k+ and takes months), we launch **FlowDesk** — a reusable base system containing unified modules for:
          </p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs font-bold text-slate-700 dark:text-slate-350 bg-slate-50/50 dark:bg-slate-900/20 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="flex items-center gap-1.5"><Target className="h-4 w-4 text-blue-500" /> Records Directory</span>
            <span className="flex items-center gap-1.5"><Target className="h-4 w-4 text-blue-500" /> Transaction Pipeline</span>
            <span className="flex items-center gap-1.5"><Target className="h-4 w-4 text-blue-500" /> Kanban Workflow Board</span>
            <span className="flex items-center gap-1.5"><Target className="h-4 w-4 text-blue-500" /> Billing Ledgers</span>
            <span className="flex items-center gap-1.5"><Target className="h-4 w-4 text-blue-500" /> File Auditing Pipelines</span>
            <span className="flex items-center gap-1.5"><Target className="h-4 w-4 text-blue-500" /> Dynamic CSV/PDF Reports</span>
          </div>
        </div>
      )
    },
    {
      title: '4. The 1-Week Customization',
      subtitle: 'Zero Code Bloat. Hand-configured Workflow Columns.',
      content: (
        <div className="space-y-6 pt-2">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold">
            We don’t sell a generic template. We configure it to match your terms in 1 week:
          </p>
          <div className="relative border-l-2 border-blue-500/30 ml-4.5 pl-6 space-y-5 py-1 text-xs">
            <div className="relative">
              <span className="absolute left-[-32px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-white font-bold text-[9px]">1</span>
              <strong className="block text-slate-800 dark:text-slate-100">Step 1: Map Vocabularies & Stages</strong>
              <span className="text-slate-400">We align on column titles (e.g. Enrollment $\to$ Assessment $\to$ Paid).</span>
            </div>
            <div className="relative">
              <span className="absolute left-[-32px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-white font-bold text-[9px]">2</span>
              <strong className="block text-slate-800 dark:text-slate-100">Step 2: Preload & Configure Database</strong>
              <span className="text-slate-400">We configure user roles, import existing lists, and customize templates.</span>
            </div>
            <div className="relative">
              <span className="absolute left-[-32px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-white font-bold text-[9px]">3</span>
              <strong className="block text-slate-800 dark:text-slate-100">Step 3: Launch Tailored Staging Pilot</strong>
              <span className="text-slate-400">We verify the workflow live with your staff, and offer net hosting configurations.</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: '5. Pilot Offer & Next Steps',
      subtitle: 'Low-risk Pilot Project. Zero Upfront Development Fee.',
      content: (
        <div className="space-y-6 pt-2">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
            We are looking for **pilot partners** in Manila. Instead of paying thousands upfront, we launch a rapid, customized configuration at an affordable entry cost:
          </p>
          <div className="rounded-xl border border-blue-100 bg-blue-50/20 p-4 dark:border-blue-950/20 dark:bg-blue-950/5 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pilot Setup + Lifetime Code</span>
              <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center"><DollarSign className="h-5 w-5" /> Customizable Tier Pricing</h4>
            </div>
            <div className="h-10 w-10 rounded-xl bg-blue-600/10 text-blue-500 border border-blue-500/10 flex items-center justify-center">
              <Settings className="h-5.5 w-5.5" />
            </div>
          </div>
          <div className="text-xs text-slate-400 leading-relaxed font-medium">
            <strong>Next Steps:</strong> Schedule a 30-min discovery session with CoreLoop Solutions. We will sketch your dynamic workflow stages on a whiteboard.
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  return (
    <div className={`space-y-6 animate-in fade-in duration-300 ${fullscreen ? 'fixed inset-0 z-50 bg-slate-900 px-8 py-10 overflow-y-auto' : ''}`}>
      <div className="flex items-center justify-between border-b border-slate-50 pb-4 dark:border-slate-800">
        <PageHeader
          title="Sales Pitch Deck"
          description="A 5-slide interactive framework to present FlowDesk directly on your screen during prospect calls."
        />
        <button
          onClick={() => setFullscreen(prev => !prev)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 flex items-center gap-1 cursor-pointer select-none"
        >
          <Presentation className="h-4 w-4 text-blue-500" />
          <span>{fullscreen ? 'Exit Screen Mode' : 'Presentation Mode'}</span>
        </button>
      </div>

      {/* Main Slide Card */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 sm:p-8 shadow-md soft-shadow dark:border-slate-800 dark:bg-slate-900 relative overflow-hidden min-h-[420px] flex flex-col justify-between">
        <div className="absolute top-0 right-0 p-3 text-[10px] text-blue-500 font-mono font-bold bg-blue-600/10 rounded-bl-xl border-l border-b border-slate-100 dark:border-slate-800">
          Slide {currentSlide + 1} of {slides.length}
        </div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 leading-tight">
            {slides[currentSlide].title}
          </h2>
          <p className="text-xs font-bold uppercase tracking-wider text-blue-500 dark:text-blue-400">
            {slides[currentSlide].subtitle}
          </p>

          <hr className="border-slate-50 my-4 dark:border-slate-800" />

          {/* Slide specific content */}
          <div className="py-2">
            {slides[currentSlide].content}
          </div>
        </div>

        {/* Slide Pagination & Navigation Controls */}
        <div className="flex items-center justify-between border-t border-slate-50 pt-5 mt-6 dark:border-slate-800">
          {/* Quick jump circles */}
          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2.5 w-2.5 rounded-full transition-all cursor-pointer ${
                  currentSlide === idx ? 'bg-blue-600 w-6' : 'bg-slate-200 hover:bg-slate-400 dark:bg-slate-800 dark:hover:bg-slate-700'
                }`}
              />
            ))}
          </div>

          <div className="flex gap-3">
            <button
              disabled={currentSlide === 0}
              onClick={handlePrev}
              className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 disabled:opacity-40 disabled:pointer-events-none hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 cursor-pointer select-none"
            >
              <ChevronLeft className="h-4.5 w-4.5" />
            </button>
            <button
              disabled={currentSlide === slides.length - 1}
              onClick={handleNext}
              className="rounded-xl bg-blue-600 p-2.5 text-white disabled:opacity-40 disabled:pointer-events-none hover:bg-blue-700 shadow-md shadow-blue-500/20 cursor-pointer select-none"
            >
              <ChevronRight className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
