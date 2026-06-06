import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/ui/PageHeader';
import { StatusBadge } from '../components/ui/StatusBadge';
import { 
  Plus, Edit2, Trash2, X, Clock, User, 
  ArrowLeft, ArrowRight 
} from 'lucide-react';
import type { WorkflowItem } from '../types';

export const Workflows: React.FC = () => {
  const { workflows, records, transactions, addWorkflow, updateWorkflow, deleteWorkflow, t, settings } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingWorkflow, setEditingWorkflow] = useState<WorkflowItem | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [clientId, setClientId] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState<'todo' | 'in_progress' | 'review' | 'done'>('todo');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const openAddModal = () => {
    setEditingWorkflow(null);
    setTitle('');
    setClientId('');
    setTransactionId('');
    setAssignedTo('');
    setStatus('todo');
    setDeadline(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]); // 3 days from now
    setPriority('medium');
    setModalOpen(true);
  };

  const openEditModal = (workflow: WorkflowItem) => {
    setEditingWorkflow(workflow);
    setTitle(workflow.title);
    setClientId(workflow.clientId || '');
    setTransactionId(workflow.transactionId || '');
    setAssignedTo(workflow.assignedTo);
    setStatus(workflow.status);
    setDeadline(workflow.deadline);
    setPriority(workflow.priority);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !assignedTo) return;

    const selectedRecord = records.find(r => r.id === clientId);

    const workflowData = {
      title,
      clientId: clientId || undefined,
      clientName: selectedRecord ? selectedRecord.name : undefined,
      transactionId: transactionId || undefined,
      assignedTo,
      status,
      deadline,
      priority
    };

    if (editingWorkflow) {
      updateWorkflow({
        ...editingWorkflow,
        ...workflowData
      });
    } else {
      addWorkflow(workflowData);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteWorkflow(id);
    }
  };

  const moveWorkflow = (workflow: WorkflowItem, direction: 'forward' | 'backward') => {
    const stages: WorkflowItem['status'][] = ['todo', 'in_progress', 'review', 'done'];
    const currentIdx = stages.indexOf(workflow.status);
    let newIdx = currentIdx;

    if (direction === 'forward' && currentIdx < stages.length - 1) {
      newIdx++;
    } else if (direction === 'backward' && currentIdx > 0) {
      newIdx--;
    }

    if (newIdx !== currentIdx) {
      updateWorkflow({
        ...workflow,
        status: stages[newIdx]
      });
    }
  };

  const columns = [
    { id: 'todo' as const, title: settings.workflowStages?.todo || 'To Do', border: 'border-t-blue-500 bg-blue-50/10 dark:bg-blue-950/5' },
    { id: 'in_progress' as const, title: settings.workflowStages?.in_progress || 'In Progress', border: 'border-t-cyan-500 bg-cyan-50/10 dark:bg-cyan-950/5' },
    { id: 'review' as const, title: settings.workflowStages?.review || 'For Review', border: 'border-t-amber-500 bg-amber-50/10 dark:bg-amber-950/5' },
    { id: 'done' as const, title: settings.workflowStages?.done || 'Done', border: 'border-t-emerald-500 bg-emerald-50/10 dark:bg-emerald-950/5' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <PageHeader
        title="Workflows"
        description="Track internal task progress, operational assignments, and deadline workflows."
        action={{
          label: 'Create Task',
          onClick: openAddModal,
          icon: Plus
        }}
      />

      {/* Kanban Board Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {columns.map((col) => {
          const colTasks = workflows.filter(w => w.status === col.id);

          return (
            <div 
              key={col.id}
              className={`flex flex-col rounded-2xl border border-slate-100 border-t-4 bg-white p-4 shadow-xs soft-shadow dark:border-slate-800 dark:bg-slate-900 ${col.border}`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-50 dark:border-slate-800">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                  {col.title}
                </span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  {colTasks.length}
                </span>
              </div>

              {/* Task Cards Container */}
              <div className="mt-4 flex-1 space-y-3 min-h-[400px] max-h-[600px] overflow-y-auto pr-1">
                {colTasks.length > 0 ? (
                  colTasks.map((workflow) => (
                    <div
                      key={workflow.id}
                      className="group relative rounded-xl border border-slate-100 bg-white p-4 hover-lift soft-shadow dark:border-slate-800/80 dark:bg-slate-950/60"
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-mono font-semibold text-slate-400">
                          {workflow.id}
                        </span>
                        <StatusBadge type="priority" status={workflow.priority} />
                      </div>

                      <h4 className="mt-2 text-sm font-bold text-slate-800 dark:text-slate-200 leading-snug">
                        {workflow.title}
                      </h4>

                      {/* Related Client & Assignment */}
                      {workflow.clientName && (
                        <p className="mt-2 text-xs font-semibold text-slate-400 dark:text-slate-500">
                          {t('record')}: <span className="text-slate-600 dark:text-slate-350">{workflow.clientName}</span>
                        </p>
                      )}

                      <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-3 dark:border-slate-800/60 text-xs">
                        <span className="text-slate-400 flex items-center gap-1 font-semibold dark:text-slate-500">
                          <User className="h-3 w-3" /> {workflow.assignedTo}
                        </span>
                        <span className="text-slate-400 flex items-center gap-1 font-medium dark:text-slate-500">
                          <Clock className="h-3 w-3" /> {workflow.deadline}
                        </span>
                      </div>

                      {/* Action Triggers */}
                      <div className="mt-3.5 flex items-center justify-between border-t border-slate-50 pt-2.5 opacity-0 group-hover:opacity-100 transition-opacity dark:border-slate-800/40">
                        <div className="flex gap-1">
                          <button
                            onClick={() => openEditModal(workflow)}
                            title="Edit task"
                            className="rounded-lg p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-600 dark:hover:bg-slate-800"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(workflow.id)}
                            title="Delete task"
                            className="rounded-lg p-1 text-slate-400 hover:bg-slate-50 hover:text-red-500 dark:hover:bg-slate-800"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {/* Shift Status Arrows */}
                        <div className="flex gap-1">
                          <button
                            disabled={col.id === 'todo'}
                            onClick={() => moveWorkflow(workflow, 'backward')}
                            title="Move back"
                            className="rounded-lg p-1 text-slate-400 disabled:opacity-30 hover:bg-slate-50 hover:text-blue-600 dark:hover:bg-slate-800"
                          >
                            <ArrowLeft className="h-3.5 w-3.5" />
                          </button>
                          <button
                            disabled={col.id === 'done'}
                            onClick={() => moveWorkflow(workflow, 'forward')}
                            title="Move forward"
                            className="rounded-lg p-1 text-slate-400 disabled:opacity-30 hover:bg-slate-50 hover:text-blue-600 dark:hover:bg-slate-800"
                          >
                            <ArrowRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex h-24 items-center justify-center rounded-xl border border-dashed border-slate-200 dark:border-slate-800/80">
                    <p className="text-xs text-slate-400 font-medium">
                      No workflows in this stage
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Task Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-100 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                {editingWorkflow ? 'Edit Task Details' : 'Create New Workflow Task'}
              </h3>
              <button 
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                  Task Title / Action Item
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Schedule diagnostic test, Sanitize treatment room"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                    Link {t('record')} (Optional)
                  </label>
                  <select
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                  >
                    <option value="">-- None --</option>
                    {records.map(r => (
                      <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                    Link Transaction ID (Optional)
                  </label>
                  <select
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                  >
                    <option value="">-- None --</option>
                    {transactions.map(r => (
                      <option key={r.id} value={r.id}>{r.id} ({r.serviceType.substring(0, 15)}...)</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                    Task Assignee
                  </label>
                  <input
                    type="text"
                    required
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    placeholder="e.g. Instructor Name, Dr. Grayson"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                    Deadline Date
                  </label>
                  <input
                    type="date"
                    required
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                    Kanban Column
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                  >
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="review">For Review</option>
                    <option value="done">Completed (Done)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                    Task Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 shadow-sm"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
