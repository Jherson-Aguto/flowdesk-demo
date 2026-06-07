import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/ui/PageHeader';
import { StatusBadge } from '../components/ui/StatusBadge';
import { 
  Plus, Edit2, Trash2, X, Clock, User, 
  ArrowLeft, ArrowRight, LayoutGrid, List, Search, Eye
} from 'lucide-react';
import type { WorkflowItem } from '../types';

export const Workflows: React.FC = () => {
  const { workflows, records, transactions, addWorkflow, updateWorkflow, deleteWorkflow, t, settings } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingWorkflow, setEditingWorkflow] = useState<WorkflowItem | null>(null);
  const [viewingWorkflow, setViewingWorkflow] = useState<WorkflowItem | null>(null);

  // View settings, search, and filtering
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

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

  // Dynamic filter query logic
  const filteredWorkflows = useMemo(() => {
    return workflows.filter(w => {
      const matchesSearch = 
        w.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (w.clientName && w.clientName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (w.id && w.id.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = statusFilter === 'all' || w.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || w.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [workflows, searchTerm, statusFilter, priorityFilter]);

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

      {/* Search, Filter, and Toggle Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 soft-shadow">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tasks, assignees, or records..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pr-4 pl-10 text-sm text-slate-700 outline-none transition-all focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200 dark:focus:border-blue-500"
            />
          </div>

          {/* Dropdown Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Stage Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 outline-none transition-all focus:border-blue-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-350"
              >
                <option value="all">All Stages</option>
                <option value="todo">{settings.workflowStages?.todo || 'To Do'}</option>
                <option value="in_progress">{settings.workflowStages?.in_progress || 'In Progress'}</option>
                <option value="review">{settings.workflowStages?.review || 'For Review'}</option>
                <option value="done">{settings.workflowStages?.done || 'Completed'}</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div className="relative">
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 outline-none transition-all focus:border-blue-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-350"
              >
                <option value="all">All Priorities</option>
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
          </div>
        </div>

        {/* View Mode Toggle Switch */}
        <div className="flex items-center gap-1.5 rounded-xl bg-slate-100 p-1 dark:bg-slate-950 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('kanban')}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all select-none cursor-pointer ${
              viewMode === 'kanban'
                ? 'bg-white text-slate-800 shadow-xs dark:bg-slate-800 dark:text-white'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span>Kanban Board</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all select-none cursor-pointer ${
              viewMode === 'list'
                ? 'bg-white text-slate-800 shadow-xs dark:bg-slate-800 dark:text-white'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <List className="h-3.5 w-3.5" />
            <span>List View</span>
          </button>
        </div>
      </div>

      {viewMode === 'list' ? (
        /* Compact List View Table - No Horizontal Scroll */
        <div className="rounded-2xl border border-slate-100 bg-white shadow-xs soft-shadow dark:border-slate-800/80 dark:bg-slate-900">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-xs font-bold tracking-wider text-slate-400 select-none text-left dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-500">
                <th className="px-4 py-4 md:px-6">Task ID</th>
                <th className="px-4 py-4 md:px-6">Task Details</th>
                <th className="px-4 py-4 md:px-6">Assignee</th>
                <th className="px-4 py-4 md:px-6 hidden sm:table-cell">Priority</th>
                <th className="px-4 py-4 md:px-6 hidden md:table-cell">Stage</th>
                <th className="px-4 py-4 md:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm dark:divide-slate-800/60">
              {filteredWorkflows.length > 0 ? (
                filteredWorkflows.map((workflow) => (
                  <tr 
                    key={workflow.id}
                    className="group transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/20"
                  >
                    <td className="px-4 py-3 md:px-6 font-mono text-xs text-slate-400 select-all">
                      {workflow.id}
                    </td>
                    <td className="px-4 py-3 md:px-6 max-w-[200px] sm:max-w-xs">
                      <p className="font-bold text-slate-800 dark:text-slate-200 truncate">
                        {workflow.title}
                      </p>
                    </td>
                    <td className="px-4 py-3 md:px-6 text-slate-500 dark:text-slate-400 font-medium">
                      <span className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5 opacity-85" /> {workflow.assignedTo}
                      </span>
                    </td>
                    <td className="px-4 py-3 md:px-6 hidden sm:table-cell">
                      <StatusBadge type="priority" status={workflow.priority} />
                    </td>
                    <td className="px-4 py-3 md:px-6 hidden md:table-cell">
                      <StatusBadge type="task" status={workflow.status} />
                    </td>
                    <td className="px-4 py-3 md:px-6 text-right">
                      <div className="flex justify-end items-center gap-1 sm:gap-1.5">
                        {/* View details eye button */}
                        <button
                          onClick={() => setViewingWorkflow(workflow)}
                          title="View all details"
                          className="rounded-lg p-1 text-slate-400 hover:bg-slate-50 hover:text-blue-600 dark:hover:bg-slate-800 cursor-pointer"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        <span className="h-3.5 w-px bg-slate-200 dark:bg-slate-800" />

                        {/* Shift Stage Buttons */}
                        <button
                          disabled={workflow.status === 'todo'}
                          onClick={() => moveWorkflow(workflow, 'backward')}
                          title="Move back a stage"
                          className="rounded-lg p-1 text-slate-400 disabled:opacity-30 hover:bg-slate-50 hover:text-blue-600 dark:hover:bg-slate-800 cursor-pointer"
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </button>
                        <button
                          disabled={workflow.status === 'done'}
                          onClick={() => moveWorkflow(workflow, 'forward')}
                          title="Move forward a stage"
                          className="rounded-lg p-1 text-slate-400 disabled:opacity-30 hover:bg-slate-50 hover:text-blue-600 dark:hover:bg-slate-800 cursor-pointer"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </button>
                        
                        <span className="h-3.5 w-px bg-slate-200 dark:bg-slate-800" />

                        <button
                          onClick={() => openEditModal(workflow)}
                          title="Edit details"
                          className="rounded-lg p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-600 dark:hover:bg-slate-800 cursor-pointer"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(workflow.id)}
                          title="Delete task"
                          className="rounded-lg p-1 text-slate-400 hover:bg-slate-50 hover:text-red-500 dark:hover:bg-slate-800 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-slate-400 dark:text-slate-500 font-medium"
                  >
                    No tasks found matching the filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        /* Kanban Board Grid */
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((col) => {
            const colTasks = filteredWorkflows.filter(w => w.status === col.id);

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
                              className="rounded-lg p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-600 dark:hover:bg-slate-800 cursor-pointer"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(workflow.id)}
                              title="Delete task"
                              className="rounded-lg p-1 text-slate-400 hover:bg-slate-50 hover:text-red-500 dark:hover:bg-slate-800 cursor-pointer"
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
                              className="rounded-lg p-1 text-slate-400 disabled:opacity-30 hover:bg-slate-50 hover:text-blue-600 dark:hover:bg-slate-800 cursor-pointer"
                            >
                              <ArrowLeft className="h-3.5 w-3.5" />
                            </button>
                            <button
                              disabled={col.id === 'done'}
                              onClick={() => moveWorkflow(workflow, 'forward')}
                              title="Move forward"
                              className="rounded-lg p-1 text-slate-400 disabled:opacity-30 hover:bg-slate-50 hover:text-blue-600 dark:hover:bg-slate-800 cursor-pointer"
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
                        No tasks in this stage
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

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
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 animate-none select-none cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 shadow-sm cursor-pointer"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Task Detail Card Modal */}
      {viewingWorkflow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                Task Detail Card
              </h3>
              <button 
                onClick={() => setViewingWorkflow(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-sm text-slate-600 dark:text-slate-350">
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Task Title</span>
                <p className="text-base font-bold text-slate-800 dark:text-slate-100 mt-1">{viewingWorkflow.title}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Task ID</span>
                  <p className="font-mono text-slate-700 dark:text-slate-300 mt-1">{viewingWorkflow.id}</p>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assignee</span>
                  <p className="text-slate-700 dark:text-slate-300 mt-1 flex items-center gap-1.5"><User className="h-4 w-4 text-slate-450" /> {viewingWorkflow.assignedTo}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Priority</span>
                  <div className="mt-1"><StatusBadge type="priority" status={viewingWorkflow.priority} /></div>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Stage</span>
                  <div className="mt-1"><StatusBadge type="task" status={viewingWorkflow.status} /></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Deadline</span>
                  <p className="text-slate-700 dark:text-slate-300 mt-1 flex items-center gap-1.5"><Clock className="h-4 w-4 text-slate-450" /> {viewingWorkflow.deadline}</p>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Linked {t('record')}</span>
                  <p className="text-slate-750 dark:text-slate-300 mt-1">{viewingWorkflow.clientName || 'None'}</p>
                </div>
              </div>

              {viewingWorkflow.transactionId && (
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Transaction ID</span>
                  <p className="font-semibold text-slate-700 dark:text-slate-300 mt-1">TX: {viewingWorkflow.transactionId}</p>
                </div>
              )}
            </div>

            <div className="flex justify-end border-t border-slate-100 pt-4 mt-6 dark:border-slate-800">
              <button
                onClick={() => setViewingWorkflow(null)}
                className="rounded-xl bg-slate-100 hover:bg-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-750 dark:text-slate-300 cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
