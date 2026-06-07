import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/ui/PageHeader';
import { DataTable } from '../components/ui/DataTable';
import type { Column } from '../components/ui/DataTable';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Plus, Edit2, Trash2, X, Eye } from 'lucide-react';
import type { RecordItem } from '../types';

export const Records: React.FC = () => {
  const { records, addRecord, updateRecord, deleteRecord, t } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<RecordItem | null>(null);
  const [viewingRecord, setViewingRecord] = useState<RecordItem | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [recordType, setRecordType] = useState('');
  const [status, setStatus] = useState<'active' | 'inactive' | 'lead'>('active');
  const [notes, setNotes] = useState('');

  const openAddModal = () => {
    setEditingRecord(null);
    setName('');
    setEmail('');
    setContactNumber('');
    setBusinessName('');
    setRecordType('');
    setStatus('active');
    setNotes('');
    setModalOpen(true);
  };

  const openEditModal = (record: RecordItem) => {
    setEditingRecord(record);
    setName(record.name);
    setEmail(record.email);
    setContactNumber(record.contactNumber);
    setBusinessName(record.businessName || '');
    setRecordType(record.type);
    setStatus(record.status);
    setNotes(record.notes);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const recordData = {
      name,
      email,
      contactNumber,
      businessName: businessName || 'Individual',
      type: recordType || 'General',
      status,
      notes
    };

    if (editingRecord) {
      updateRecord({
        ...editingRecord,
        ...recordData
      });
    } else {
      addRecord(recordData);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm(`Are you sure you want to delete this ${t('record').toLowerCase()}?`)) {
      deleteRecord(id);
    }
  };

  const columns: Column<RecordItem>[] = [
    {
      header: 'ID',
      accessor: 'id',
      className: 'w-20 font-mono font-semibold'
    },
    {
      header: 'Name',
      accessor: (item) => (
        <div>
          <span className="block font-bold text-slate-800 dark:text-slate-100">{item.name}</span>
          <span className="block text-xs text-slate-400 font-medium">{item.email}</span>
        </div>
      )
    },
    {
      header: 'Contact',
      accessor: 'contactNumber',
      className: 'font-medium'
    },
    {
      header: 'Status',
      accessor: (item) => <StatusBadge type="client" status={item.status} />,
      align: 'center'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <PageHeader
        title={t('recordPlural')}
        description={`Manage the list of registered ${t('recordPlural').toLowerCase()} in the system.`}
        action={{
          label: `Add ${t('record')}`,
          onClick: openAddModal,
          icon: Plus
        }}
      />

      <DataTable
        data={records}
        columns={columns}
        searchPlaceholder={`Search by name, email, or affiliation...`}
        searchFields={['name', 'email', 'businessName', 'type']}
        filters={[
          {
            label: 'Status',
            field: 'status',
            options: [
              { label: 'Active', value: 'active' },
              { label: 'Inactive', value: 'inactive' },
              { label: 'Lead', value: 'lead' }
            ]
          }
        ]}
        actions={(item) => (
          <>
            <button
              onClick={() => setViewingRecord(item)}
              title="View details"
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <Eye className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={() => openEditModal(item)}
              title="Edit record"
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <Edit2 className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={() => handleDelete(item.id)}
              title="Delete record"
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-red-600 dark:hover:bg-slate-800 dark:hover:text-red-400"
            >
              <Trash2 className="h-4.5 w-4.5" />
            </button>
          </>
        )}
      />

      {/* Add / Edit Modal Drawer */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-100 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                {editingRecord ? `Edit ${t('record')}` : `Add New ${t('record')}`}
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
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jane Doe"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. jane@company.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="e.g. +1 (555) 123-4567"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                    Organization / Company
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Acme Corp (or Individual)"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                    Sub-Type Category
                  </label>
                  <input
                    type="text"
                    value={recordType}
                    onChange={(e) => setRecordType(e.target.value)}
                    placeholder="e.g. Corporate, Student, VIP"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                  Lifecycle Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'active' | 'inactive' | 'lead')}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="lead">Lead / Prospect</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                  Internal Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add custom notes..."
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

      {/* View Details Modal */}
      {viewingRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-100 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                {t('record')} Details — {viewingRecord.id}
              </h3>
              <button 
                onClick={() => setViewingRecord(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-sm">
              <div className="grid grid-cols-3 gap-2 border-b border-slate-50 pb-2 dark:border-slate-800/40">
                <span className="font-semibold text-slate-400">Name</span>
                <span className="col-span-2 font-bold text-slate-800 dark:text-slate-100">{viewingRecord.name}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-slate-50 pb-2 dark:border-slate-800/40">
                <span className="font-semibold text-slate-400">Email Address</span>
                <span className="col-span-2 font-medium text-slate-700 dark:text-slate-350">{viewingRecord.email}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-slate-50 pb-2 dark:border-slate-800/40">
                <span className="font-semibold text-slate-400">Contact Number</span>
                <span className="col-span-2 font-medium text-slate-700 dark:text-slate-350">{viewingRecord.contactNumber}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-slate-50 pb-2 dark:border-slate-800/40">
                <span className="font-semibold text-slate-400">Organization</span>
                <span className="col-span-2 font-medium text-slate-700 dark:text-slate-350">{viewingRecord.businessName || 'Individual'}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-slate-50 pb-2 dark:border-slate-800/40">
                <span className="font-semibold text-slate-400">Category / Type</span>
                <span className="col-span-2 font-semibold text-slate-700 dark:text-slate-350">{viewingRecord.type}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-slate-50 pb-2 dark:border-slate-800/40">
                <span className="font-semibold text-slate-400">Status</span>
                <span className="col-span-2"><StatusBadge type="client" status={viewingRecord.status} /></span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-slate-50 pb-2 dark:border-slate-800/40">
                <span className="font-semibold text-slate-400">Date Added</span>
                <span className="col-span-2 font-medium text-slate-500">{viewingRecord.dateAdded}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pb-2">
                <span className="font-semibold text-slate-400">Internal Notes</span>
                <span className="col-span-2 text-slate-600 dark:text-slate-400 whitespace-pre-line leading-relaxed">
                  {viewingRecord.notes || 'No notes listed.'}
                </span>
              </div>

              <div className="flex justify-end border-t border-slate-100 pt-4 dark:border-slate-800">
                <button
                  onClick={() => setViewingRecord(null)}
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
