import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/ui/PageHeader';
import { DataTable } from '../components/ui/DataTable';
import type { Column } from '../components/ui/DataTable';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Plus, Edit2, Trash2, X, Eye } from 'lucide-react';
import type { TransactionItem } from '../types';

export const Transactions: React.FC = () => {
  const { transactions, records, addTransaction, updateTransaction, deleteTransaction, t, settings } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<TransactionItem | null>(null);
  const [viewingTransaction, setViewingTransaction] = useState<TransactionItem | null>(null);

  // Form states
  const [clientId, setClientId] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [status, setStatus] = useState<TransactionItem['status']>('new');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [assignedStaff, setAssignedStaff] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [remarks, setRemarks] = useState('');

  const openAddModal = () => {
    setEditingTransaction(null);
    setClientId(records[0]?.id || '');
    setServiceType('');
    setStatus('new');
    setPriority('medium');
    setAssignedStaff('');
    setDueDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]); // 1 week from now
    setRemarks('');
    setModalOpen(true);
  };

  const openEditModal = (tData: TransactionItem) => {
    setEditingTransaction(tData);
    setClientId(tData.clientId);
    setServiceType(tData.serviceType);
    setStatus(tData.status);
    setPriority(tData.priority);
    setAssignedStaff(tData.assignedStaff);
    setDueDate(tData.dueDate);
    setRemarks(tData.remarks);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId) return;

    const selectedRecord = records.find(r => r.id === clientId);
    if (!selectedRecord) return;

    const transactionData = {
      clientId,
      clientName: selectedRecord.name,
      serviceType: serviceType || 'General Operations',
      status,
      priority,
      assignedStaff: assignedStaff || 'Unassigned',
      dueDate,
      remarks
    };

    if (editingTransaction) {
      updateTransaction({
        ...editingTransaction,
        ...transactionData
      });
    } else {
      addTransaction(transactionData);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm(`Are you sure you want to delete this ${t('transaction').toLowerCase()}?`)) {
      deleteTransaction(id);
    }
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
      accessor: (item) => <StatusBadge type="request" status={settings.statusLabels.transaction[item.status] || item.status} />,
      align: 'center'
    },
    {
      header: 'Priority',
      accessor: (item) => <StatusBadge type="priority" status={item.priority} />,
      align: 'center'
    },
    {
      header: t('assignedStaff'),
      accessor: 'assignedStaff',
      className: 'font-medium'
    },
    {
      header: 'Due Date',
      accessor: 'dueDate',
      className: 'text-xs text-slate-400 font-medium'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <PageHeader
        title={t('transactionPlural')}
        description={`Track workflow state, assignments, and priorities for operational ${t('transactionPlural').toLowerCase()}.`}
        action={{
          label: `Create ${t('transaction')}`,
          onClick: openAddModal,
          icon: Plus
        }}
      />

      <DataTable
        data={transactions}
        columns={columns}
        searchPlaceholder={`Search by reference name, service, or staff...`}
        searchFields={['clientName', 'serviceType', 'assignedStaff', 'id']}
        filters={[
          {
            label: 'Status',
            field: 'status',
            options: Object.entries(settings.statusLabels.transaction).map(([key, val]) => ({
              label: val,
              value: key
            }))
          },
          {
            label: 'Priority',
            field: 'priority',
            options: [
              { label: 'High', value: 'high' },
              { label: 'Medium', value: 'medium' },
              { label: 'Low', value: 'low' }
            ]
          }
        ]}
        actions={(item) => (
          <>
            <button
              onClick={() => setViewingTransaction(item)}
              title="View details"
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <Eye className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={() => openEditModal(item)}
              title="Edit transaction"
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <Edit2 className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={() => handleDelete(item.id)}
              title="Delete transaction"
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-red-600 dark:hover:bg-slate-800 dark:hover:text-red-400"
            >
              <Trash2 className="h-4.5 w-4.5" />
            </button>
          </>
        )}
      />

      {/* Add / Edit Transaction Modal Drawer */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-100 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                {editingTransaction ? `Edit ${t('transaction')}` : `Create New ${t('transaction')}`}
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
                  Select {t('record')}
                </label>
                <select
                  required
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                >
                  <option value="" disabled>-- Choose {t('record')} --</option>
                  {records.map(r => (
                    <option key={r.id} value={r.id}>
                      {r.name} {r.businessName ? `(${r.businessName})` : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                  {t('service')} Category
                </label>
                <input
                  type="text"
                  required
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  placeholder="e.g. Consult, Cargo Delivery, Order Intake"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                  list="service-suggestions"
                />
                <datalist id="service-suggestions">
                  {settings.serviceTypes.map(s => (
                    <option key={s} value={s} />
                  ))}
                </datalist>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                    Workflow Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                  >
                    {Object.entries(settings.statusLabels.transaction).map(([key, val]) => (
                      <option key={key} value={key}>{val}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                    Operational Priority
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

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                    {t('assignedStaff')}
                  </label>
                  <input
                    type="text"
                    value={assignedStaff}
                    onChange={(e) => setAssignedStaff(e.target.value)}
                    placeholder="e.g. Jameson Cole"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                    Due Date / Deadline
                  </label>
                  <input
                    type="date"
                    required
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                  Remarks & Instructions
                </label>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="e.g. Customs manifest review pending, check student SAT score..."
                  rows={3}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200 resize-none"
                />
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
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Drawer */}
      {viewingTransaction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-100 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                Transaction Details — {viewingTransaction.id}
              </h3>
              <button 
                onClick={() => setViewingTransaction(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-sm">
              <div className="grid grid-cols-3 gap-2 border-b border-slate-50 pb-2 dark:border-slate-800/40">
                <span className="font-semibold text-slate-400">{t('record')} Name</span>
                <span className="col-span-2 font-bold text-slate-800 dark:text-slate-100">{viewingTransaction.clientName}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-slate-50 pb-2 dark:border-slate-800/40">
                <span className="font-semibold text-slate-400">{t('service')} Category</span>
                <span className="col-span-2 font-semibold text-slate-700 dark:text-slate-350">{viewingTransaction.serviceType}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-slate-50 pb-2 dark:border-slate-800/40">
                <span className="font-semibold text-slate-400">Workflow Status</span>
                <span className="col-span-2">
                  <StatusBadge type="request" status={settings.statusLabels.transaction[viewingTransaction.status] || viewingTransaction.status} />
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-slate-50 pb-2 dark:border-slate-800/40">
                <span className="font-semibold text-slate-400">Priority Weight</span>
                <span className="col-span-2"><StatusBadge type="priority" status={viewingTransaction.priority} /></span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-slate-50 pb-2 dark:border-slate-800/40">
                <span className="font-semibold text-slate-400">{t('assignedStaff')}</span>
                <span className="col-span-2 font-medium text-slate-700 dark:text-slate-350">{viewingTransaction.assignedStaff}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-slate-50 pb-2 dark:border-slate-800/40">
                <span className="font-semibold text-slate-400">Date Logged</span>
                <span className="col-span-2 font-medium text-slate-500">{viewingTransaction.dateCreated}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-slate-50 pb-2 dark:border-slate-800/40">
                <span className="font-semibold text-slate-400">Target Due Date</span>
                <span className="col-span-2 font-semibold text-slate-700 dark:text-slate-350">{viewingTransaction.dueDate}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pb-2">
                <span className="font-semibold text-slate-400">Log / Remarks</span>
                <span className="col-span-2 text-slate-600 dark:text-slate-400 whitespace-pre-line leading-relaxed">
                  {viewingTransaction.remarks || 'No notes added.'}
                </span>
              </div>

              <div className="flex justify-end border-t border-slate-100 pt-4 dark:border-slate-800">
                <button
                  onClick={() => setViewingTransaction(null)}
                  className="rounded-xl bg-slate-100 px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
