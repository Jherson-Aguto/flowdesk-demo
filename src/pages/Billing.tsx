import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/ui/PageHeader';
import { DataTable } from '../components/ui/DataTable';
import type { Column } from '../components/ui/DataTable';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Plus, Edit2, Trash2, X, DollarSign, Activity, FileText } from 'lucide-react';
import type { BillingItem } from '../types';

export const Billing: React.FC = () => {
  const { billing, records, addBilling, updateBilling, deleteBilling, t, settings } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBilling, setEditingBilling] = useState<BillingItem | null>(null);

  // Form states
  const [clientId, setClientId] = useState('');
  const [reference, setReference] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<BillingItem['status']>('unpaid');
  const [dueDate, setDueDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [notes, setNotes] = useState('');

  const stats = useMemo(() => {
    let totalInvoiced = 0;
    let totalPaid = 0;
    let totalOutstanding = 0;
    let overdueCount = 0;

    billing.forEach(p => {
      totalInvoiced += p.amount;
      if (p.status === 'paid') {
        totalPaid += p.amount;
      } else if (p.status === 'partial') {
        totalPaid += p.amount / 2; // Mock calculation: paid half
        totalOutstanding += p.amount / 2;
      } else {
        totalOutstanding += p.amount;
        if (p.status === 'overdue') {
          overdueCount++;
        }
      }
    });

    return { totalInvoiced, totalPaid, totalOutstanding, overdueCount };
  }, [billing]);

  const openAddModal = () => {
    setEditingBilling(null);
    setClientId(records[0]?.id || '');
    setReference(`REF-${Date.now().toString().slice(-4)}`);
    setAmount('');
    setStatus('unpaid');
    setDueDate(new Date().toISOString().split('T')[0]);
    setPaymentMethod('Bank Transfer');
    setNotes('');
    setModalOpen(true);
  };

  const openEditModal = (p: BillingItem) => {
    setEditingBilling(p);
    setClientId(p.clientId);
    setReference(p.reference);
    setAmount(String(p.amount));
    setStatus(p.status);
    setDueDate(p.dueDate);
    setPaymentMethod(p.paymentMethod);
    setNotes(p.notes);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId || !amount) return;

    const selectedRecord = records.find(r => r.id === clientId);
    if (!selectedRecord) return;

    const billingData = {
      clientId,
      clientName: selectedRecord.name,
      reference,
      amount: parseFloat(amount),
      status,
      dueDate,
      paymentMethod,
      notes
    };

    if (editingBilling) {
      updateBilling({
        ...editingBilling,
        ...billingData
      });
    } else {
      addBilling(billingData);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this billing invoice?')) {
      deleteBilling(id);
    }
  };

  const columns: Column<BillingItem>[] = [
    {
      header: 'Ref / Invoice',
      accessor: 'reference',
      className: 'w-28 font-mono font-semibold'
    },
    {
      header: t('record'),
      accessor: 'clientName',
      className: 'font-bold text-slate-800 dark:text-slate-100'
    },
    {
      header: 'Amount',
      accessor: (item) => (
        <span className="font-bold text-slate-700 dark:text-slate-200">
          ${item.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      )
    },
    {
      header: 'Status',
      accessor: (item) => <StatusBadge type="payment" status={settings.statusLabels.billing[item.status] || item.status} />,
      align: 'center'
    },
    {
      header: 'Due Date',
      accessor: 'dueDate',
      className: 'text-xs text-slate-400 font-medium'
    },
    {
      header: 'Method',
      accessor: 'paymentMethod',
      className: 'font-medium'
    },
    {
      header: 'Remarks / Notes',
      accessor: 'notes',
      className: 'text-xs text-slate-400 max-w-xs truncate font-medium'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <PageHeader
        title="Billing & Invoicing"
        description="Track accounts receivables, invoicing references, and payment terms."
        action={{
          label: 'Create Invoice',
          onClick: openAddModal,
          icon: Plus
        }}
      />

      {/* Financial Summary Stats Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs soft-shadow dark:border-slate-800 dark:bg-slate-900 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Billed</span>
            <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100">${stats.totalInvoiced.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h4>
          </div>
          <div className="h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-500 flex items-center justify-center border border-blue-100 dark:border-blue-900/10">
            <FileText className="h-5.5 w-5.5" />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs soft-shadow dark:border-slate-800 dark:bg-slate-900 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Collected</span>
            <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100">${stats.totalPaid.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h4>
          </div>
          <div className="h-10 w-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 flex items-center justify-center border border-emerald-100 dark:border-emerald-900/10">
            <DollarSign className="h-5.5 w-5.5" />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs soft-shadow dark:border-slate-800 dark:bg-slate-900 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Outstanding billing</span>
            <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100">${stats.totalOutstanding.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h4>
          </div>
          <div className="h-10 w-10 rounded-xl bg-amber-50 dark:bg-amber-950/20 text-amber-500 flex items-center justify-center border border-amber-100 dark:border-amber-900/10">
            <Activity className="h-5.5 w-5.5" />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs soft-shadow dark:border-slate-800 dark:bg-slate-900 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Overdue bills</span>
            <h4 className="text-xl font-bold text-rose-600 dark:text-rose-400">{stats.overdueCount}</h4>
          </div>
          <div className="h-10 w-10 rounded-xl bg-rose-50 dark:bg-rose-950/20 text-rose-500 flex items-center justify-center border border-rose-100 dark:border-rose-900/10">
            <DollarSign className="h-5.5 w-5.5" />
          </div>
        </div>
      </div>

      <DataTable
        data={billing}
        columns={columns}
        searchPlaceholder="Search by invoice reference, client name, payment method..."
        searchFields={['reference', 'clientName', 'paymentMethod']}
        filters={[
          {
            label: 'Billing Status',
            field: 'status',
            options: Object.entries(settings.statusLabels.billing).map(([key, val]) => ({
              label: val,
              value: key
            }))
          }
        ]}
        actions={(item) => (
          <>
            <button
              onClick={() => openEditModal(item)}
              title="Edit Billing Status"
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <Edit2 className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={() => handleDelete(item.id)}
              title="Delete Invoice"
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-red-600 dark:hover:bg-slate-800 dark:hover:text-red-400"
            >
              <Trash2 className="h-4.5 w-4.5" />
            </button>
          </>
        )}
      />

      {/* Add / Edit Payment Modal Drawer */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-100 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                {editingBilling ? 'Modify Billing Invoice' : 'Generate New Billing Invoice'}
              </h3>
              <button 
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-4 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
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
                      <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                    Invoice Reference
                  </label>
                  <input
                    type="text"
                    required
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    placeholder="e.g. REF-SAT-9921"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                    Billed Amount ($)
                  </label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="e.g. 1200.00"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                    Invoice Due Date
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

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                    Billing Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                  >
                    {Object.entries(settings.statusLabels.billing).map(([key, val]) => (
                      <option key={key} value={key}>{val}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                    Preferred Method
                  </label>
                  <input
                    type="text"
                    required
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    placeholder="e.g. Bank Transfer, Wire, Card"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                  Billing Remarks & Details
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Received partial deposit check #2212..."
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
                  Save Invoices
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
