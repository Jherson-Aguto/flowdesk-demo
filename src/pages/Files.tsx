import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/ui/PageHeader';
import { DataTable } from '../components/ui/DataTable';
import type { Column } from '../components/ui/DataTable';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Plus, Edit2, Trash2, X, FolderCheck } from 'lucide-react';
import type { FileItem } from '../types';

export const Files: React.FC = () => {
  const { files, records, transactions, addFile, updateFile, deleteFile, t, settings } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFile, setEditingFile] = useState<FileItem | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [clientId, setClientId] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [status, setStatus] = useState<FileItem['status']>('required');
  const [remarks, setRemarks] = useState('');

  const openAddModal = () => {
    setEditingFile(null);
    setName('');
    setClientId(records[0]?.id || '');
    setTransactionId('');
    setStatus('required');
    setRemarks('');
    setModalOpen(true);
  };

  const openEditModal = (f: FileItem) => {
    setEditingFile(f);
    setName(f.name);
    setClientId(f.clientId);
    setTransactionId(f.transactionId || '');
    setStatus(f.status);
    setRemarks(f.remarks);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !clientId) return;

    const selectedRecord = records.find(r => r.id === clientId);
    if (!selectedRecord) return;

    const fileData = {
      name,
      clientId,
      clientName: selectedRecord.name,
      transactionId: transactionId || undefined,
      status,
      uploadedDate: status !== 'required' ? new Date().toISOString().split('T')[0] : undefined,
      remarks
    };

    if (editingFile) {
      updateFile({
        ...editingFile,
        ...fileData
      });
    } else {
      addFile(fileData);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this file record?')) {
      deleteFile(id);
    }
  };

  const columns: Column<FileItem>[] = [
    {
      header: 'ID',
      accessor: 'id',
      className: 'w-20 font-mono font-semibold'
    },
    {
      header: 'File Name',
      accessor: (item) => (
        <div className="flex items-center gap-2">
          <FolderCheck className="h-4.5 w-4.5 text-blue-500 shrink-0" />
          <span className="font-bold text-slate-800 dark:text-slate-100">{item.name}</span>
        </div>
      )
    },
    {
      header: t('record'),
      accessor: 'clientName',
      className: 'font-bold text-slate-700 dark:text-slate-350'
    },
    {
      header: 'Linked Transaction',
      accessor: (item) => (
        <span className="font-mono text-xs font-semibold text-slate-400">
          {item.transactionId || 'Unlinked'}
        </span>
      )
    },
    {
      header: 'Review Status',
      accessor: (item) => <StatusBadge type="document" status={settings.statusLabels.file[item.status] || item.status} />,
      align: 'center'
    },
    {
      header: 'Uploaded Date',
      accessor: (item) => (
        <span className="text-xs text-slate-400 font-medium">
          {item.uploadedDate || 'Pending Submission'}
        </span>
      )
    },
    {
      header: 'Remarks / Directives',
      accessor: 'remarks',
      className: 'text-xs text-slate-400 max-w-xs truncate font-medium'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <PageHeader
        title="Files & Documents"
        description="Verify uploaded files, verify contracts, and manage operational sheets."
        action={{
          label: 'Request File',
          onClick: openAddModal,
          icon: Plus
        }}
      />

      <DataTable
        data={files}
        columns={columns}
        searchPlaceholder="Search by file name, records, or remarks..."
        searchFields={['name', 'clientName', 'remarks']}
        filters={[
          {
            label: 'Review Status',
            field: 'status',
            options: Object.entries(settings.statusLabels.file).map(([key, val]) => ({
              label: val,
              value: key
            }))
          }
        ]}
        actions={(item) => (
          <>
            <button
              onClick={() => openEditModal(item)}
              title="Edit File Status"
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <Edit2 className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={() => handleDelete(item.id)}
              title="Delete File Log"
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-red-600 dark:hover:bg-slate-800 dark:hover:text-red-400"
            >
              <Trash2 className="h-4.5 w-4.5" />
            </button>
          </>
        )}
      />

      {/* Add / Edit Document Modal Drawer */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-100 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                {editingFile ? 'Edit File Review State' : 'Register File Request'}
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
                  File Name / Title
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. SAT Registration Slip.pdf"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                    Link {t('record')}
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

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                  Pipeline Stage
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                >
                  {Object.entries(settings.statusLabels.file).map(([key, val]) => (
                    <option key={key} value={key}>{val}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                  Review Directive / Remarks
                </label>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="e.g. Signed medical disclosure needed before session..."
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
                  Save File
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
