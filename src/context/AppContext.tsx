import React, { createContext, useContext, useState, useEffect } from 'react';
import type { 
  RecordItem, TransactionItem, WorkflowItem, ScheduleEvent, BillingItem, FileItem, 
  ActivityLog, SystemSettings, IndustryType, Vocabulary 
} from '../types';
import { 
  defaultRecords, defaultTransactions, defaultWorkflows, defaultSchedule, defaultBilling, 
  defaultFiles, mockActivityLogs 
} from '../data/mockData';

interface AppContextProps {
  settings: SystemSettings;
  updateSettings: (newSettings: Partial<SystemSettings>) => void;
  records: RecordItem[];
  addRecord: (record: Omit<RecordItem, 'id' | 'dateAdded'>) => void;
  updateRecord: (record: RecordItem) => void;
  deleteRecord: (id: string) => void;
  transactions: TransactionItem[];
  addTransaction: (transaction: Omit<TransactionItem, 'id' | 'dateCreated'>) => void;
  updateTransaction: (transaction: TransactionItem) => void;
  deleteTransaction: (id: string) => void;
  workflows: WorkflowItem[];
  addWorkflow: (workflow: Omit<WorkflowItem, 'id'>) => void;
  updateWorkflow: (workflow: WorkflowItem) => void;
  deleteWorkflow: (id: string) => void;
  schedule: ScheduleEvent[];
  addScheduleEvent: (event: Omit<ScheduleEvent, 'id'>) => void;
  updateScheduleEvent: (event: ScheduleEvent) => void;
  deleteScheduleEvent: (id: string) => void;
  billing: BillingItem[];
  addBilling: (billing: Omit<BillingItem, 'id'>) => void;
  updateBilling: (billing: BillingItem) => void;
  deleteBilling: (id: string) => void;
  files: FileItem[];
  addFile: (file: Omit<FileItem, 'id'>) => void;
  updateFile: (file: FileItem) => void;
  deleteFile: (id: string) => void;
  activityLogs: ActivityLog[];
  logActivity: (action: string, details: string, type?: 'info' | 'success' | 'warning' | 'danger') => void;
  t: (key: keyof Vocabulary) => string;
}

const vocabularies: Record<IndustryType, Vocabulary> = {
  general: {
    record: 'Record',
    recordPlural: 'Records',
    transaction: 'Transaction',
    transactionPlural: 'Transactions',
    service: 'Service Type',
    servicePlural: 'Services',
    assignedStaff: 'Assigned Staff',
    businessNameLabel: 'Business Name',
  },
  training: {
    record: 'Student',
    recordPlural: 'Students',
    transaction: 'Enrollment',
    transactionPlural: 'Enrollments',
    service: 'Course Type',
    servicePlural: 'Courses',
    assignedStaff: 'Instructor / Tutor',
    businessNameLabel: 'Training Center Name',
  },
  clinic: {
    record: 'Patient',
    recordPlural: 'Patients',
    transaction: 'Appointment',
    transactionPlural: 'Appointments',
    service: 'Treatment / Consultation',
    servicePlural: 'Medical Services',
    assignedStaff: 'Doctor / Therapist',
    businessNameLabel: 'Clinic Name',
  },
  logistics: {
    record: 'Shipper / Receiver',
    recordPlural: 'Shippers & Clients',
    transaction: 'Shipment Booking',
    transactionPlural: 'Shipment Bookings',
    service: 'Delivery Type',
    servicePlural: 'Logistics Services',
    assignedStaff: 'Dispatcher / Driver',
    businessNameLabel: 'Logistics Company Name',
  },
  distributor: {
    record: 'Retailer / Account',
    recordPlural: 'Accounts & Retailers',
    transaction: 'Purchase Order',
    transactionPlural: 'Purchase Orders',
    service: 'Product Line',
    servicePlural: 'Products',
    assignedStaff: 'Sales Rep / Stock Lead',
    businessNameLabel: 'Distributor Name',
  },
  service: {
    record: 'Client',
    recordPlural: 'Clients',
    transaction: 'Service Ticket',
    transactionPlural: 'Service Tickets',
    service: 'Ticket Category',
    servicePlural: 'Categories',
    assignedStaff: 'Technician / Agent',
    businessNameLabel: 'Agency Name',
  },
};

const defaultWorkflowStages: Record<IndustryType, { todo: string; in_progress: string; review: string; done: string }> = {
  general: { todo: 'To Do', in_progress: 'In Progress', review: 'For Review', done: 'Completed' },
  training: { todo: 'Enrollment', in_progress: 'Academic Assessment', review: 'Tuition Payment', done: 'Confirmed / Enrolled' },
  clinic: { todo: 'Appointment Scheduled', in_progress: 'Clinical Consult', review: 'Billing & Pharmacy', done: 'Closed / Discharged' },
  logistics: { todo: 'Cargo Booking', in_progress: 'Customs & Manifest', review: 'Dispatch & Transit', done: 'Delivered & Closed' },
  distributor: { todo: 'Purchase Order', in_progress: 'Stock Allocation', review: 'Packing & Transit', done: 'Fulfilled' },
  service: { todo: 'Ticket Logged', in_progress: 'Technician Assigned', review: 'Client Review', done: 'Solved & Closed' },
};

const defaultSettings: SystemSettings = {
  businessName: 'Northbridge Services Co.',
  industryType: 'general',
  serviceTypes: [
    'Consultation',
    'Enrollment',
    'Delivery Request',
    'Document Processing',
    'Product Order',
    'Service Appointment'
  ],
  userRoles: ['Admin User', 'Manager', 'Operations Staff'],
  statusLabels: {
    transaction: {
      new: 'New',
      in_progress: 'In Progress',
      waiting: 'Waiting',
      completed: 'Completed',
      cancelled: 'Cancelled',
    },
    billing: {
      unpaid: 'Unpaid',
      partial: 'Partial Payment',
      paid: 'Paid',
      overdue: 'Overdue',
      refunded: 'Refunded',
    },
    file: {
      required: 'Required',
      submitted: 'Submitted',
      for_review: 'Under Review',
      approved: 'Approved',
      released: 'Released',
    }
  },
  workflowStages: {
    todo: 'To Do',
    in_progress: 'In Progress',
    review: 'For Review',
    done: 'Completed'
  },
  theme: 'light',
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load settings from localStorage or fallback to defaults
  const [settings, setSettings] = useState<SystemSettings>(() => {
    const saved = localStorage.getItem('flowdesk_settings');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Fallback in case workflowStages is not defined in saved settings
      if (!parsed.workflowStages) {
        parsed.workflowStages = defaultWorkflowStages[(parsed.industryType as IndustryType) || 'general'];
      }
      return parsed;
    }
    return defaultSettings;
  });

  // Dynamic initializers depending on current industryType
  const [records, setRecords] = useState<RecordItem[]>(() => {
    const savedSettings = localStorage.getItem('flowdesk_settings');
    const type = savedSettings ? JSON.parse(savedSettings).industryType : 'general';
    const saved = localStorage.getItem(`flowdesk_records_${type}`);
    return saved ? JSON.parse(saved) : defaultRecords[type as IndustryType] || defaultRecords.general;
  });

  const [transactions, setTransactions] = useState<TransactionItem[]>(() => {
    const savedSettings = localStorage.getItem('flowdesk_settings');
    const type = savedSettings ? JSON.parse(savedSettings).industryType : 'general';
    const saved = localStorage.getItem(`flowdesk_transactions_${type}`);
    return saved ? JSON.parse(saved) : defaultTransactions[type as IndustryType] || defaultTransactions.general;
  });

  const [workflows, setWorkflows] = useState<WorkflowItem[]>(() => {
    const savedSettings = localStorage.getItem('flowdesk_settings');
    const type = savedSettings ? JSON.parse(savedSettings).industryType : 'general';
    const saved = localStorage.getItem(`flowdesk_workflows_${type}`);
    return saved ? JSON.parse(saved) : defaultWorkflows[type as IndustryType] || defaultWorkflows.general;
  });

  const [schedule, setSchedule] = useState<ScheduleEvent[]>(() => {
    const savedSettings = localStorage.getItem('flowdesk_settings');
    const type = savedSettings ? JSON.parse(savedSettings).industryType : 'general';
    const saved = localStorage.getItem(`flowdesk_schedule_${type}`);
    return saved ? JSON.parse(saved) : defaultSchedule[type as IndustryType] || defaultSchedule.general;
  });

  const [billing, setBilling] = useState<BillingItem[]>(() => {
    const savedSettings = localStorage.getItem('flowdesk_settings');
    const type = savedSettings ? JSON.parse(savedSettings).industryType : 'general';
    const saved = localStorage.getItem(`flowdesk_billing_${type}`);
    return saved ? JSON.parse(saved) : defaultBilling[type as IndustryType] || defaultBilling.general;
  });

  const [files, setFiles] = useState<FileItem[]>(() => {
    const savedSettings = localStorage.getItem('flowdesk_settings');
    const type = savedSettings ? JSON.parse(savedSettings).industryType : 'general';
    const saved = localStorage.getItem(`flowdesk_files_${type}`);
    return saved ? JSON.parse(saved) : defaultFiles[type as IndustryType] || defaultFiles.general;
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem('flowdesk_logs');
    return saved ? JSON.parse(saved) : mockActivityLogs;
  });

  // Sync settings and logs globally
  useEffect(() => {
    localStorage.setItem('flowdesk_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('flowdesk_logs', JSON.stringify(activityLogs));
  }, [activityLogs]);

  // Apply body dark class
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  const updateSettings = (newSettings: Partial<SystemSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      
      // If industryType changed, apply default workflowStages for that industry
      if (newSettings.industryType && newSettings.industryType !== prev.industryType) {
        updated.workflowStages = defaultWorkflowStages[newSettings.industryType];
      }
      return updated;
    });
    
    // Switch dynamic profile dataset states
    if (newSettings.industryType && newSettings.industryType !== settings.industryType) {
      const newType = newSettings.industryType;
      
      // First save current states for active profile
      localStorage.setItem(`flowdesk_records_${settings.industryType}`, JSON.stringify(records));
      localStorage.setItem(`flowdesk_transactions_${settings.industryType}`, JSON.stringify(transactions));
      localStorage.setItem(`flowdesk_workflows_${settings.industryType}`, JSON.stringify(workflows));
      localStorage.setItem(`flowdesk_schedule_${settings.industryType}`, JSON.stringify(schedule));
      localStorage.setItem(`flowdesk_billing_${settings.industryType}`, JSON.stringify(billing));
      localStorage.setItem(`flowdesk_files_${settings.industryType}`, JSON.stringify(files));

      // Now load new data states (or default to preloads)
      const loadedRecords = localStorage.getItem(`flowdesk_records_${newType}`);
      const nextRecords = loadedRecords ? JSON.parse(loadedRecords) : defaultRecords[newType];
      setRecords(nextRecords);

      const loadedTransactions = localStorage.getItem(`flowdesk_transactions_${newType}`);
      const nextTransactions = loadedTransactions ? JSON.parse(loadedTransactions) : defaultTransactions[newType];
      setTransactions(nextTransactions);

      const loadedWorkflows = localStorage.getItem(`flowdesk_workflows_${newType}`);
      const nextWorkflows = loadedWorkflows ? JSON.parse(loadedWorkflows) : defaultWorkflows[newType];
      setWorkflows(nextWorkflows);

      const loadedSchedule = localStorage.getItem(`flowdesk_schedule_${newType}`);
      const nextSchedule = loadedSchedule ? JSON.parse(loadedSchedule) : defaultSchedule[newType];
      setSchedule(nextSchedule);

      const loadedBilling = localStorage.getItem(`flowdesk_billing_${newType}`);
      const nextBilling = loadedBilling ? JSON.parse(loadedBilling) : defaultBilling[newType];
      setBilling(nextBilling);

      const loadedFiles = localStorage.getItem(`flowdesk_files_${newType}`);
      const nextFiles = loadedFiles ? JSON.parse(loadedFiles) : defaultFiles[newType];
      setFiles(nextFiles);

      logActivity(
        'Workspace Configuration Updated',
        `Industry profile successfully shifted to ${vocabularies[newType].recordPlural} mode. Demo dataset preloaded.`,
        'success'
      );
    } else if (newSettings.businessName && newSettings.businessName !== settings.businessName) {
      logActivity(
        'Business Profile Updated',
        `Company title updated to "${newSettings.businessName}".`,
        'info'
      );
    } else {
      logActivity('Settings Modified', 'System theme or user preferences adjusted.', 'info');
    }
  };

  const logActivity = (
    action: string, 
    details: string, 
    type: 'info' | 'success' | 'warning' | 'danger' = 'info'
  ) => {
    const newLog: ActivityLog = {
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: 'Admin User',
      action,
      details,
      type
    };
    setActivityLogs(prev => {
      const updated = [newLog, ...prev.slice(0, 49)];
      return updated;
    });
  };

  // Translation helper
  const t = (key: keyof Vocabulary): string => {
    const currentVocab = vocabularies[settings.industryType] || vocabularies.general;
    return currentVocab[key];
  };

  // --- CRUD Operations ---

  // Records
  const addRecord = (record: Omit<RecordItem, 'id' | 'dateAdded'>) => {
    const newRecord: RecordItem = {
      ...record,
      id: `C-${Date.now().toString().slice(-4)}`,
      dateAdded: new Date().toISOString().split('T')[0]
    };
    setRecords(prev => {
      const next = [newRecord, ...prev];
      localStorage.setItem(`flowdesk_records_${settings.industryType}`, JSON.stringify(next));
      return next;
    });
    logActivity(`Added ${t('record')}`, `Created record for ${newRecord.name}`, 'success');
  };

  const updateRecord = (updatedRecord: RecordItem) => {
    setRecords(prev => {
      const next = prev.map(c => c.id === updatedRecord.id ? updatedRecord : c);
      localStorage.setItem(`flowdesk_records_${settings.industryType}`, JSON.stringify(next));
      return next;
    });
    logActivity(`Updated ${t('record')}`, `Modified records for ${updatedRecord.name}`, 'info');
  };

  const deleteRecord = (id: string) => {
    const record = records.find(c => c.id === id);
    setRecords(prev => {
      const next = prev.filter(c => c.id !== id);
      localStorage.setItem(`flowdesk_records_${settings.industryType}`, JSON.stringify(next));
      return next;
    });
    logActivity(`Deleted ${t('record')}`, `Removed record for ${record?.name || id}`, 'danger');
  };

  // Transactions
  const addTransaction = (transaction: Omit<TransactionItem, 'id' | 'dateCreated'>) => {
    const newTransaction: TransactionItem = {
      ...transaction,
      id: `TX-${Date.now().toString().slice(-4)}`,
      dateCreated: new Date().toISOString().split('T')[0]
    };
    setTransactions(prev => {
      const next = [newTransaction, ...prev];
      localStorage.setItem(`flowdesk_transactions_${settings.industryType}`, JSON.stringify(next));
      return next;
    });
    logActivity(`Created ${t('transaction')}`, `Opened ticket ${newTransaction.id} for ${newTransaction.clientName}`, 'success');
  };

  const updateTransaction = (updatedTransaction: TransactionItem) => {
    setTransactions(prev => {
      const next = prev.map(r => r.id === updatedTransaction.id ? updatedTransaction : r);
      localStorage.setItem(`flowdesk_transactions_${settings.industryType}`, JSON.stringify(next));
      return next;
    });
    logActivity(`Updated ${t('transaction')}`, `Saved changes to ticket ${updatedTransaction.id}`, 'info');
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => {
      const next = prev.filter(r => r.id !== id);
      localStorage.setItem(`flowdesk_transactions_${settings.industryType}`, JSON.stringify(next));
      return next;
    });
    logActivity(`Deleted ${t('transaction')}`, `Removed ticket ${id}`, 'danger');
  };

  // Workflows
  const addWorkflow = (workflow: Omit<WorkflowItem, 'id'>) => {
    const newWorkflow: WorkflowItem = {
      ...workflow,
      id: `TSK-${Date.now().toString().slice(-4)}`
    };
    setWorkflows(prev => {
      const next = [newWorkflow, ...prev];
      localStorage.setItem(`flowdesk_workflows_${settings.industryType}`, JSON.stringify(next));
      return next;
    });
    logActivity('Created Workflow Task', `Assigned task "${newWorkflow.title}" to ${newWorkflow.assignedTo}`, 'success');
  };

  const updateWorkflow = (updatedWorkflow: WorkflowItem) => {
    setWorkflows(prev => {
      const next = prev.map(t => t.id === updatedWorkflow.id ? updatedWorkflow : t);
      localStorage.setItem(`flowdesk_workflows_${settings.industryType}`, JSON.stringify(next));
      return next;
    });
    logActivity('Updated Workflow Task', `Modified task details for "${updatedWorkflow.title}"`, 'info');
  };

  const deleteWorkflow = (id: string) => {
    const workflow = workflows.find(t => t.id === id);
    setWorkflows(prev => {
      const next = prev.filter(t => t.id !== id);
      localStorage.setItem(`flowdesk_workflows_${settings.industryType}`, JSON.stringify(next));
      return next;
    });
    logActivity('Deleted Workflow Task', `Removed task "${workflow?.title || id}"`, 'danger');
  };

  // Schedule
  const addScheduleEvent = (event: Omit<ScheduleEvent, 'id'>) => {
    const newEvent: ScheduleEvent = {
      ...event,
      id: `SCH-${Date.now().toString().slice(-4)}`
    };
    setSchedule(prev => {
      const next = [newEvent, ...prev];
      localStorage.setItem(`flowdesk_schedule_${settings.industryType}`, JSON.stringify(next));
      return next;
    });
    logActivity('Scheduled Event', `Booked "${newEvent.title}" on ${newEvent.date}`, 'success');
  };

  const updateScheduleEvent = (updatedEvent: ScheduleEvent) => {
    setSchedule(prev => {
      const next = prev.map(e => e.id === updatedEvent.id ? updatedEvent : e);
      localStorage.setItem(`flowdesk_schedule_${settings.industryType}`, JSON.stringify(next));
      return next;
    });
    logActivity('Updated Event', `Rescheduled "${updatedEvent.title}"`, 'info');
  };

  const deleteScheduleEvent = (id: string) => {
    const event = schedule.find(e => e.id === id);
    setSchedule(prev => {
      const next = prev.filter(e => e.id !== id);
      localStorage.setItem(`flowdesk_schedule_${settings.industryType}`, JSON.stringify(next));
      return next;
    });
    logActivity('Cancelled Event', `Removed event "${event?.title || id}"`, 'danger');
  };

  // Billing
  const addBilling = (billingData: Omit<BillingItem, 'id'>) => {
    const newBilling: BillingItem = {
      ...billingData,
      id: `PAY-${Date.now().toString().slice(-4)}`
    };
    setBilling(prev => {
      const next = [newBilling, ...prev];
      localStorage.setItem(`flowdesk_billing_${settings.industryType}`, JSON.stringify(next));
      return next;
    });
    logActivity('Created Billing Invoice', `Invoiced ${newBilling.clientName} for $${newBilling.amount.toFixed(2)}`, 'success');
  };

  const updateBilling = (updatedBilling: BillingItem) => {
    setBilling(prev => {
      const next = prev.map(p => p.id === updatedBilling.id ? updatedBilling : p);
      localStorage.setItem(`flowdesk_billing_${settings.industryType}`, JSON.stringify(next));
      return next;
    });
    logActivity('Updated Billing Record', `Invoicing reference ${updatedBilling.reference} status: ${updatedBilling.status}`, 'info');
  };

  const deleteBilling = (id: string) => {
    const billingInvoice = billing.find(p => p.id === id);
    setBilling(prev => {
      const next = prev.filter(p => p.id !== id);
      localStorage.setItem(`flowdesk_billing_${settings.industryType}`, JSON.stringify(next));
      return next;
    });
    logActivity('Removed Billing Invoice', `Deleted invoice ref ${billingInvoice?.reference || id}`, 'danger');
  };

  // Files
  const addFile = (fileData: Omit<FileItem, 'id'>) => {
    const newFile: FileItem = {
      ...fileData,
      id: `DOC-${Date.now().toString().slice(-4)}`
    };
    setFiles(prev => {
      const next = [newFile, ...prev];
      localStorage.setItem(`flowdesk_files_${settings.industryType}`, JSON.stringify(next));
      return next;
    });
    logActivity('Registered File', `Added ${newFile.name} for client ${newFile.clientName}`, 'success');
  };

  const updateFile = (updatedFile: FileItem) => {
    setFiles(prev => {
      const next = prev.map(d => d.id === updatedFile.id ? updatedFile : d);
      localStorage.setItem(`flowdesk_files_${settings.industryType}`, JSON.stringify(next));
      return next;
    });
    logActivity('Updated File Status', `Adjusted status of ${updatedFile.name} to ${updatedFile.status}`, 'info');
  };

  const deleteFile = (id: string) => {
    const fileItem = files.find(d => d.id === id);
    setFiles(prev => {
      const next = prev.filter(d => d.id !== id);
      localStorage.setItem(`flowdesk_files_${settings.industryType}`, JSON.stringify(next));
      return next;
    });
    logActivity('Deleted File Track', `Removed document registry ${fileItem?.name || id}`, 'danger');
  };

  return (
    <AppContext.Provider value={{
      settings, updateSettings,
      records, addRecord, updateRecord, deleteRecord,
      transactions, addTransaction, updateTransaction, deleteTransaction,
      workflows, addWorkflow, updateWorkflow, deleteWorkflow,
      schedule, addScheduleEvent, updateScheduleEvent, deleteScheduleEvent,
      billing, addBilling, updateBilling, deleteBilling,
      files, addFile, updateFile, deleteFile,
      activityLogs, logActivity, t
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
