import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/ui/PageHeader';
import { 
  Plus, Edit2, Trash2, X, Calendar, Clock, 
  User, AlertCircle, Bookmark 
} from 'lucide-react';
import type { ScheduleEvent } from '../types';

export const Schedule: React.FC = () => {
  const { schedule, records, addScheduleEvent, updateScheduleEvent, deleteScheduleEvent, t } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<ScheduleEvent | null>(null);
  const [filterType, setFilterType] = useState<string>('all');

  // Form states
  const [title, setTitle] = useState('');
  const [clientId, setClientId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState('appointment');
  const [status, setStatus] = useState<'scheduled' | 'completed' | 'cancelled'>('scheduled');
  const [assignedStaff, setAssignedStaff] = useState('');

  const openAddModal = () => {
    setEditingEvent(null);
    setTitle('');
    setClientId('');
    setDate(new Date().toISOString().split('T')[0]);
    setTime('09:00 - 10:00');
    setType('appointment');
    setStatus('scheduled');
    setAssignedStaff('');
    setModalOpen(true);
  };

  const openEditModal = (event: ScheduleEvent) => {
    setEditingEvent(event);
    setTitle(event.title);
    setClientId(event.clientId || '');
    setDate(event.date);
    setTime(event.time);
    setType(event.type);
    setStatus(event.status);
    setAssignedStaff(event.assignedStaff);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !time) return;

    const selectedRecord = records.find(r => r.id === clientId);

    const eventData = {
      title,
      clientId: clientId || undefined,
      clientName: selectedRecord ? selectedRecord.name : undefined,
      date,
      time,
      type,
      status,
      assignedStaff: assignedStaff || 'Unassigned'
    };

    if (editingEvent) {
      updateScheduleEvent({
        ...editingEvent,
        ...eventData
      });
    } else {
      addScheduleEvent(eventData);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to cancel this event?')) {
      deleteScheduleEvent(id);
    }
  };

  // Group events by date
  const filteredEventsByDate = useMemo(() => {
    const filtered = schedule.filter(evt => {
      if (filterType === 'all') return true;
      return evt.type === filterType;
    });

    // Sort by date then by time
    const sorted = [...filtered].sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date);
      if (dateCompare !== 0) return dateCompare;
      return a.time.localeCompare(b.time);
    });

    // Grouping reducer
    const groups: Record<string, ScheduleEvent[]> = {};
    sorted.forEach(evt => {
      if (!groups[evt.date]) {
        groups[evt.date] = [];
      }
      groups[evt.date].push(evt);
    });

    return groups;
  }, [schedule, filterType]);

  const getTypeIcon = (typeStr: string) => {
    switch (typeStr) {
      case 'class':
        return <Bookmark className="h-4.5 w-4.5 text-emerald-500" />;
      case 'delivery':
        return <Bookmark className="h-4.5 w-4.5 text-amber-500" />;
      case 'deadline':
        return <AlertCircle className="h-4.5 w-4.5 text-rose-500" />;
      case 'appointment':
      default:
        return <Calendar className="h-4.5 w-4.5 text-blue-500" />;
    }
  };

  const formatEventTypeName = (typeStr: string) => {
    if (typeStr === 'class') return 'Class / Session';
    if (typeStr === 'delivery') return 'Delivery / Dispatch';
    if (typeStr === 'deadline') return 'Deadline / Meeting';
    return 'Appointment / Consult';
  };

  const formatDateLabel = (dateStr: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString('en-US', options);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <PageHeader
        title="Schedule & Bookings"
        description="Chronological schedule of consultations, dispatch timings, client appointments, and deadlines."
        action={{
          label: 'Book Appointment',
          onClick: openAddModal,
          icon: Plus
        }}
      />

      {/* Interactive Tabs Filter */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-100 pb-3 dark:border-slate-800">
        {[
          { id: 'all', label: 'All Operations' },
          { id: 'appointment', label: 'Appointments' },
          { id: 'class', label: 'Classes / Lessons' },
          { id: 'delivery', label: 'Deliveries' },
          { id: 'deadline', label: 'Deadlines & Staff' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            className={`rounded-xl px-4 py-2 text-xs font-semibold select-none transition-all
              ${filterType === tab.id
                ? 'bg-slate-800 text-white dark:bg-blue-600'
                : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/60'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Chronological Timeline */}
      <div className="space-y-8 mt-6">
        {Object.keys(filteredEventsByDate).length > 0 ? (
          Object.entries(filteredEventsByDate).map(([dateStr, events]) => (
            <div key={dateStr} className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-slate-350" />
                {formatDateLabel(dateStr)}
              </h3>
              
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((evt) => (
                  <div 
                    key={evt.id}
                    className="group relative rounded-2xl border border-slate-100 bg-white p-5 hover-lift soft-shadow dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-2 py-1 dark:bg-slate-950/40">
                        {getTypeIcon(evt.type)}
                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          {formatEventTypeName(evt.type)}
                        </span>
                      </div>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border
                        ${evt.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/10' : ''}
                        ${evt.status === 'cancelled' ? 'bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/10' : ''}
                        ${evt.status === 'scheduled' ? 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/10' : ''}
                      `}>
                        {evt.status}
                      </span>
                    </div>

                    <h4 className="mt-3 text-sm font-bold text-slate-800 dark:text-slate-100">
                      {evt.title}
                    </h4>

                    {evt.clientName && (
                      <p className="mt-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500">
                        {t('record')}: <span className="text-slate-600 dark:text-slate-350">{evt.clientName}</span>
                      </p>
                    )}

                    <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-3 dark:border-slate-800/60 text-xs">
                      <span className="text-slate-400 flex items-center gap-1 font-semibold dark:text-slate-500">
                        <Clock className="h-3.5 w-3.5" /> {evt.time}
                      </span>
                      <span className="text-slate-400 flex items-center gap-1 font-semibold dark:text-slate-500">
                        <User className="h-3.5 w-3.5" /> {evt.assignedStaff}
                      </span>
                    </div>

                    {/* Action Panel on Hover */}
                    <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEditModal(evt)}
                        title="Edit appointment"
                        className="rounded-lg bg-slate-50 p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:bg-slate-800 dark:text-slate-500 dark:hover:text-slate-300"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(evt.id)}
                        title="Cancel appointment"
                        className="rounded-lg bg-slate-50 p-1 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:bg-slate-800 dark:text-slate-500 dark:hover:bg-red-950/40 dark:hover:text-red-400"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 py-16 text-center dark:border-slate-800">
            <Calendar className="h-10 w-10 text-slate-300 dark:text-slate-700 animate-bounce" />
            <h4 className="mt-4 text-sm font-bold text-slate-500 dark:text-slate-400">
              No schedules listed
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Add appointments or dispatches for this category to see them here.
            </p>
          </div>
        )}
      </div>

      {/* Add / Edit Appointment Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-100 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                {editingEvent ? 'Modify Scheduled Booking' : 'Schedule New Operation Booking'}
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
                  Event / Session Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Session Title"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                  Select {t('record')} (Optional)
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

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                    Calendar Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                    Time Slot (Range)
                  </label>
                  <input
                    type="text"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="e.g. 14:00 - 15:30"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                    Event Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                  >
                    <option value="appointment">Appointment / Consult</option>
                    <option value="class">Class / Lesson</option>
                    <option value="delivery">Delivery / Dispatch</option>
                    <option value="deadline">Deadline / Meeting</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                    Booking Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                  Host / Assigned Staff
                </label>
                <input
                  type="text"
                  value={assignedStaff}
                  onChange={(e) => setAssignedStaff(e.target.value)}
                  placeholder="e.g. Elena Rostova"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
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
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
