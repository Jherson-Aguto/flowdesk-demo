export type IndustryType = 'general' | 'training' | 'clinic' | 'logistics' | 'distributor' | 'service';

export interface SystemSettings {
  businessName: string;
  industryType: IndustryType;
  serviceTypes: string[];
  userRoles: string[];
  statusLabels: {
    transaction: Record<string, string>;
    billing: Record<string, string>;
    file: Record<string, string>;
  };
  workflowStages: {
    todo: string;
    in_progress: string;
    review: string;
    done: string;
  };
  theme: 'light' | 'dark' | 'glass';
}

export interface RecordItem {
  id: string;
  name: string;
  contactNumber: string;
  email: string;
  businessName?: string; // Business/Organization
  type: string;          // e.g., Corporate, Individual, Student level, Patient type
  status: 'active' | 'inactive' | 'lead';
  notes: string;
  dateAdded: string;
}

export interface TransactionItem {
  id: string;
  clientName: string; // The display name
  clientId: string;   // Maps to the Record id
  serviceType: string;
  status: 'new' | 'in_progress' | 'waiting' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  assignedStaff: string;
  dateCreated: string;
  dueDate: string;
  remarks: string;
}

export interface WorkflowItem {
  id: string;
  title: string;
  clientName?: string;
  clientId?: string;
  transactionId?: string;
  assignedTo: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  deadline: string;
  priority: 'low' | 'medium' | 'high';
}

export interface ScheduleEvent {
  id: string;
  title: string;
  clientName?: string;
  clientId?: string;
  date: string;
  time: string;
  type: string; // appointment, delivery, deadline, class
  status: 'scheduled' | 'completed' | 'cancelled';
  assignedStaff: string;
}

export interface BillingItem {
  id: string;
  clientId: string;
  clientName: string;
  reference: string;
  amount: number;
  status: 'unpaid' | 'partial' | 'paid' | 'overdue' | 'refunded';
  dueDate: string;
  paymentMethod: string;
  notes: string;
}

export interface FileItem {
  id: string;
  name: string;
  clientName: string;
  clientId: string;
  transactionId?: string;
  status: 'required' | 'submitted' | 'for_review' | 'approved' | 'released';
  uploadedDate?: string;
  remarks: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
  type: 'info' | 'success' | 'warning' | 'danger';
}

export interface Vocabulary {
  record: string;
  recordPlural: string;
  transaction: string;
  transactionPlural: string;
  service: string;
  servicePlural: string;
  assignedStaff: string;
  businessNameLabel: string;
}
