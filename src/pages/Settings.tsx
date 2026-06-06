import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/ui/PageHeader';
import { 
  Sliders, Sparkles, Check, Moon, Sun, Layers 
} from 'lucide-react';
import type { IndustryType } from '../types';

export const Settings: React.FC = () => {
  const { settings, updateSettings } = useApp();
  
  // Local Form states
  const [businessName, setBusinessName] = useState(settings.businessName);
  const [industryType, setIndustryType] = useState<IndustryType>(settings.industryType);
  const [theme, setTheme] = useState(settings.theme);
  
  // Custom status label local states
  const [newTransactionLabel, setNewTransactionLabel] = useState(settings.statusLabels.transaction.new);
  const [inProgressTransactionLabel, setInProgressTransactionLabel] = useState(settings.statusLabels.transaction.in_progress);
  const [completedTransactionLabel, setCompletedTransactionLabel] = useState(settings.statusLabels.transaction.completed);
  
  const [unpaidBillingLabel, setUnpaidBillingLabel] = useState(settings.statusLabels.billing.unpaid);
  const [paidBillingLabel, setPaidBillingLabel] = useState(settings.statusLabels.billing.paid);

  // Workflow Stages states
  const [todoStage, setTodoStage] = useState(settings.workflowStages?.todo || 'To Do');
  const [inProgressStage, setInProgressStage] = useState(settings.workflowStages?.in_progress || 'In Progress');
  const [reviewStage, setReviewStage] = useState(settings.workflowStages?.review || 'For Review');
  const [doneStage, setDoneStage] = useState(settings.workflowStages?.done || 'Completed');

  // Saved feedback text
  const [savedFeedback, setSavedFeedback] = useState(false);

  const defaultWorkflowStages: Record<IndustryType, { todo: string; in_progress: string; review: string; done: string }> = {
    general: { todo: 'To Do', in_progress: 'In Progress', review: 'For Review', done: 'Completed' },
    training: { todo: 'Enrollment', in_progress: 'Academic Assessment', review: 'Tuition Payment', done: 'Confirmed / Enrolled' },
    clinic: { todo: 'Appointment Scheduled', in_progress: 'Clinical Consult', review: 'Billing & Pharmacy', done: 'Closed / Discharged' },
    logistics: { todo: 'Cargo Booking', in_progress: 'Customs & Manifest', review: 'Dispatch & Transit', done: 'Delivered & Closed' },
    distributor: { todo: 'Purchase Order', in_progress: 'Stock Allocation', review: 'Packing & Transit', done: 'Fulfilled' },
    service: { todo: 'Ticket Logged', in_progress: 'Technician Assigned', review: 'Client Review', done: 'Solved & Closed' },
  };

  const handleIndustryChange = (val: IndustryType) => {
    setIndustryType(val);
    const stages = defaultWorkflowStages[val];
    setTodoStage(stages.todo);
    setInProgressStage(stages.in_progress);
    setReviewStage(stages.review);
    setDoneStage(stages.done);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateSettings({
      businessName,
      industryType,
      theme,
      statusLabels: {
        ...settings.statusLabels,
        transaction: {
          ...settings.statusLabels.transaction,
          new: newTransactionLabel,
          in_progress: inProgressTransactionLabel,
          completed: completedTransactionLabel
        },
        billing: {
          ...settings.statusLabels.billing,
          unpaid: unpaidBillingLabel,
          paid: paidBillingLabel
        }
      },
      workflowStages: {
        todo: todoStage,
        in_progress: inProgressStage,
        review: reviewStage,
        done: doneStage
      }
    });

    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 3000);
  };

  // Vocabulary Map metadata for visualization
  const vocabMap = [
    { key: 'General Operations', record: 'Record', transaction: 'Transaction', service: 'Service Type', staff: 'Assigned Staff' },
    { key: 'Training Center', record: 'Student', transaction: 'Enrollment', service: 'Course Type', staff: 'Instructor / Tutor' },
    { key: 'Clinic / Medical', record: 'Patient', transaction: 'Appointment', service: 'Treatment / Consult', staff: 'Doctor / Therapist' },
    { key: 'Logistics / Dispatch', record: 'Shipper / Receiver', transaction: 'Shipment Booking', service: 'Delivery Type', staff: 'Dispatcher / Driver' },
    { key: 'Distributor / Supply', record: 'Retailer / Account', transaction: 'Purchase Order', service: 'Product Line', staff: 'Sales Rep / Stock Lead' },
    { key: 'Professional Service', record: 'Client', transaction: 'Service Ticket', service: 'Ticket Category', staff: 'Technician / Agent' },
  ];

  const getActiveVocabRowClass = (rowKey: string) => {
    const isCurrent = 
      (industryType === 'general' && rowKey === 'General Operations') ||
      (industryType === 'training' && rowKey === 'Training Center') ||
      (industryType === 'clinic' && rowKey === 'Clinic / Medical') ||
      (industryType === 'logistics' && rowKey === 'Logistics / Dispatch') ||
      (industryType === 'distributor' && rowKey === 'Distributor / Supply') ||
      (industryType === 'service' && rowKey === 'Professional Service');

    return isCurrent 
      ? 'bg-blue-50/70 border border-blue-200 dark:bg-blue-950/20 dark:border-blue-900/30' 
      : 'border border-transparent opacity-60';
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <PageHeader
        title="System Settings"
        description="Adapt application vocabularies, labels, themes, and industry profiles to your specific business."
      />

      {savedFeedback && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3.5 text-sm font-semibold text-emerald-700 flex items-center gap-2 dark:bg-emerald-950/20 dark:border-emerald-900/10 dark:text-emerald-400 animate-in slide-in-from-top-4 duration-250 select-none">
          <Check className="h-4.5 w-4.5 shrink-0 animate-bounce" />
          <span>System configuration updated successfully! Vocabulary translations applied.</span>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Settings Configuration Column */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-100 bg-white p-6 shadow-xs soft-shadow dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 border-b border-slate-50 pb-4 dark:border-slate-800 text-slate-800 dark:text-slate-100">
            <Sliders className="h-4.5 w-4.5 text-blue-500" />
            <h3 className="text-base font-bold">Workspace Configuration</h3>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {/* Business Profile */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                  Business / Company Title
                </label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Northbridge Services Co."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                  Industry Profile / Adapter
                </label>
                <select
                  value={industryType}
                  onChange={(e) => handleIndustryChange(e.target.value as IndustryType)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200 font-semibold"
                >
                  <option value="general">General Operations Profile</option>
                  <option value="training">Training / Review Center Profile</option>
                  <option value="clinic">Clinic / Medical Appointment Profile</option>
                  <option value="logistics">Logistics / Cargo Dispatch Profile</option>
                  <option value="distributor">Distributor Inventory Profile</option>
                  <option value="service">Professional Service Profile</option>
                </select>
              </div>
            </div>

            {/* Styling theme */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                  Theme Palette
                </label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value as any)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                >
                  <option value="light">Classic Light theme</option>
                  <option value="dark">Professional Dark theme</option>
                </select>
              </div>

              <div className="flex items-center gap-3 p-3.5 bg-slate-50/60 rounded-xl dark:bg-slate-950/20 select-none">
                {theme === 'dark' ? <Moon className="h-5 w-5 text-blue-400 animate-bounce" /> : <Sun className="h-5 w-5 text-amber-500 animate-spin" />}
                <div>
                  <span className="block text-xs font-bold text-slate-700 dark:text-slate-200">System Theme Active</span>
                  <span className="text-[10px] text-slate-400 font-medium">FlowDesk layouts adapt automatically</span>
                </div>
              </div>
            </div>

            {/* Workflow Kanban Stages Customizer */}
            <div className="border-t border-slate-50 pt-5 dark:border-slate-800/60">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Workflow Builder (Rename Kanban Stages in Real-Time)
              </span>
              
              <div className="grid gap-4 sm:grid-cols-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                    To Do Stage
                  </label>
                  <input
                    type="text"
                    required
                    value={todoStage}
                    onChange={(e) => setTodoStage(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-2.5 py-1.5 text-xs text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                    In Progress Stage
                  </label>
                  <input
                    type="text"
                    required
                    value={inProgressStage}
                    onChange={(e) => setInProgressStage(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-2.5 py-1.5 text-xs text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                    Review Stage
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewStage}
                    onChange={(e) => setReviewStage(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-2.5 py-1.5 text-xs text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                    Done / Completed
                  </label>
                  <input
                    type="text"
                    required
                    value={doneStage}
                    onChange={(e) => setDoneStage(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-2.5 py-1.5 text-xs text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                  />
                </div>
              </div>
            </div>

            {/* Status Labels Customizer */}
            <div className="border-t border-slate-50 pt-5 dark:border-slate-800/60">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Label Customs Mapping (Live UI translation)
              </span>
              
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                    New Transaction Status Label
                  </label>
                  <input
                    type="text"
                    value={newTransactionLabel}
                    onChange={(e) => setNewTransactionLabel(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-2.5 py-1.5 text-xs text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                    In Progress Label
                  </label>
                  <input
                    type="text"
                    value={inProgressTransactionLabel}
                    onChange={(e) => setInProgressTransactionLabel(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-2.5 py-1.5 text-xs text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                    Completed Label
                  </label>
                  <input
                    type="text"
                    value={completedTransactionLabel}
                    onChange={(e) => setCompletedTransactionLabel(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-2.5 py-1.5 text-xs text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 mt-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                    Unpaid Billing Status Label
                  </label>
                  <input
                    type="text"
                    value={unpaidBillingLabel}
                    onChange={(e) => setUnpaidBillingLabel(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-2.5 py-1.5 text-xs text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                    Cleared Billing Status Label
                  </label>
                  <input
                    type="text"
                    value={paidBillingLabel}
                    onChange={(e) => setPaidBillingLabel(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-2.5 py-1.5 text-xs text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all select-none cursor-pointer"
              >
                Save System Settings
              </button>
            </div>
          </form>
        </div>

        {/* Vocabulary Adaptability Map Column (WOW Factor Card) */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xs soft-shadow dark:border-slate-800 dark:bg-slate-900 flex flex-col">
          <div className="flex items-center gap-2 border-b border-slate-50 pb-4 dark:border-slate-800 text-slate-800 dark:text-slate-100">
            <Layers className="h-4.5 w-4.5 text-blue-500" />
            <div>
              <h3 className="text-base font-bold">Vocabulary Adaptability</h3>
              <p className="text-[10px] text-slate-400 font-medium">Demonstrating FlowDesk UI Translations</p>
            </div>
          </div>

          <div className="mt-4 flex-1 space-y-3 max-h-[500px] overflow-y-auto pr-1">
            <div className="rounded-xl bg-blue-50/50 border border-blue-100/60 p-3.5 text-xs text-blue-800 leading-relaxed font-semibold dark:bg-blue-950/20 dark:border-blue-900/10 dark:text-blue-400 select-none">
              <Sparkles className="h-4 w-4 shrink-0 inline mr-1" /> Selecting an industry profile automatically adapts page layouts, headers, tables, forms, and contexts instantly.
            </div>

            {vocabMap.map((row) => (
              <div 
                key={row.key}
                className={`rounded-xl p-3.5 transition-all text-xs ${getActiveVocabRowClass(row.key)}`}
              >
                <div className="flex items-center justify-between font-bold mb-2">
                  <span className="text-slate-800 dark:text-slate-200">{row.key}</span>
                  {getActiveVocabRowClass(row.key).includes('blue-50') && (
                    <span className="flex items-center gap-0.5 rounded-full bg-blue-600 px-2 py-0.5 text-[9px] font-semibold text-white select-none shadow-xs shadow-blue-500/10">
                      Active Profile
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-slate-500 mt-1.5 font-medium">
                  <div>
                    <span className="block text-[9px] font-bold text-slate-400 uppercase">Records Label</span>
                    <span className="text-slate-700 dark:text-slate-350">{row.record}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-slate-400 uppercase">Transactions Label</span>
                    <span className="text-slate-700 dark:text-slate-350">{row.transaction}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-slate-400 uppercase">Service Category</span>
                    <span className="text-slate-700 dark:text-slate-350">{row.service}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-slate-400 uppercase">Assigned Staff</span>
                    <span className="text-slate-700 dark:text-slate-350">{row.staff}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
