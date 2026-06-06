import type { 
  RecordItem, TransactionItem, WorkflowItem, ScheduleEvent, 
  BillingItem, FileItem, ActivityLog, IndustryType 
} from '../types';

// ==========================================
// 1. RECORDS (CRM Entities) by Industry
// ==========================================
export const defaultRecords: Record<IndustryType, RecordItem[]> = {
  general: [
    {
      id: 'C-101',
      name: 'Sarah Jenkins',
      contactNumber: '+1 (555) 234-5678',
      email: 'sarah.j@gmail.com',
      businessName: 'Individual',
      type: 'Retail Customer',
      status: 'active',
      notes: 'Standard service accounts. Prefers email updates.',
      dateAdded: '2026-03-15',
    },
    {
      id: 'C-102',
      name: 'Robert Chen',
      contactNumber: '+1 (555) 987-6543',
      email: 'robert.chen@apex.com',
      businessName: 'Apex Corp',
      type: 'Corporate Account',
      status: 'active',
      notes: 'Monthly dispatch retainer contract.',
      dateAdded: '2026-04-02',
    }
  ],
  clinic: [
    {
      id: 'P-101',
      name: 'Pedro Penduko',
      contactNumber: '+63 917 123 4567',
      email: 'pedro.p@outlook.com',
      businessName: 'Individual',
      type: 'Outpatient / Cardiology',
      status: 'active',
      notes: 'Requires weekly blood pressure review. Prefers afternoon slots.',
      dateAdded: '2026-05-10',
    },
    {
      id: 'P-102',
      name: 'Clara Clara',
      contactNumber: '+63 920 987 6543',
      email: 'clara@pediatrics.org',
      businessName: 'Individual',
      type: 'Patient / Pediatrics',
      status: 'active',
      notes: 'Under Dr. Evelyn Martinez care. Allergic to penicillin.',
      dateAdded: '2026-05-20',
    }
  ],
  training: [
    {
      id: 'S-101',
      name: 'Maria Santos',
      contactNumber: '+63 918 223 3445',
      email: 'maria.santos@yahoo.com',
      businessName: 'Vocational Scholar',
      type: 'Caregiving NC II Student',
      status: 'active',
      notes: 'Preparing for international nursing visa requirements. Weekend classes.',
      dateAdded: '2026-04-15',
    },
    {
      id: 'S-102',
      name: 'Juan Dela Cruz',
      contactNumber: '+63 909 334 4556',
      email: 'juan.dc@gmail.com',
      businessName: 'Individual',
      type: 'IELTS Intensive Student',
      status: 'active',
      notes: 'Nursing visa candidate. Focuses on speaking and writing mock tests.',
      dateAdded: '2026-05-02',
    }
  ],
  logistics: [
    {
      id: 'L-101',
      name: 'Manila Port Traders',
      contactNumber: '+63 2 8244 1234',
      email: 'ops@manilaporttraders.com',
      businessName: 'Manila Port Traders Inc.',
      type: 'Corporate / Shipper',
      status: 'active',
      notes: 'Weekly harbor container container dispatch contracts. High-volume.',
      dateAdded: '2026-01-10',
    },
    {
      id: 'L-102',
      name: 'Cebu Transit Solutions',
      contactNumber: '+63 32 231 4567',
      email: 'logistics@cebutransit.com',
      businessName: 'Cebu Transit Solutions',
      type: 'Shipper / LTL Account',
      status: 'active',
      notes: 'Handles palletized food cargo transfers to Visayas.',
      dateAdded: '2026-02-28',
    }
  ],
  distributor: [
    {
      id: 'D-101',
      name: 'SM Wholesale Accounts',
      contactNumber: '+63 2 8888 9000',
      email: 'purchasing@smwholesale.com.ph',
      businessName: 'SM Retail Group',
      type: 'Wholesaler Account',
      status: 'active',
      notes: 'Net-45 credit terms. High-volume consumer electronics imports.',
      dateAdded: '2026-03-01',
    },
    {
      id: 'D-102',
      name: 'Robinson Supermarket Co',
      contactNumber: '+63 2 8395 1111',
      email: 'buyers@robinsons.com.ph',
      businessName: 'Robinsons Retail Holdings',
      type: 'Supermarket Distributor',
      status: 'active',
      notes: 'Direct warehouse drop-off schedule required. Strict intake hours.',
      dateAdded: '2026-03-12',
    }
  ],
  service: [
    {
      id: 'V-101',
      name: 'Tech Startup Manila',
      contactNumber: '+63 927 555 4321',
      email: 'finance@techstartup.ph',
      businessName: 'Tech Startup Manila Inc.',
      type: 'Retained Consultancy Account',
      status: 'active',
      notes: 'Tax compliance retainer contract. Monthly reporting cycles.',
      dateAdded: '2026-05-18',
    },
    {
      id: 'V-102',
      name: 'Alpha Law Firm',
      contactNumber: '+63 2 8123 7777',
      email: 'contact@alphalaw.com.ph',
      businessName: 'Alpha & Associates Law',
      type: 'IT Services Contract',
      status: 'active',
      notes: 'Cloud database migration project. SLA active.',
      dateAdded: '2026-05-25',
    }
  ]
};

// ==========================================
// 2. TRANSACTIONS (Operations) by Industry
// ==========================================
export const defaultTransactions: Record<IndustryType, TransactionItem[]> = {
  general: [
    {
      id: 'TX-201',
      clientName: 'Sarah Jenkins',
      clientId: 'C-101',
      serviceType: 'Consultation',
      status: 'in_progress',
      priority: 'high',
      assignedStaff: 'Elena Rostova',
      dateCreated: '2026-05-20',
      dueDate: '2026-06-15',
      remarks: 'Initial assessment review pending.',
    }
  ],
  clinic: [
    {
      id: 'AP-201',
      clientName: 'Pedro Penduko',
      clientId: 'P-101',
      serviceType: 'Cardiology Consult',
      status: 'in_progress',
      priority: 'high',
      assignedStaff: 'Dr. Grayson (Cardiologist)',
      dateCreated: '2026-06-01',
      dueDate: '2026-06-07',
      remarks: 'Awaiting English diagnostic test results and placement evaluation.',
    },
    {
      id: 'AP-202',
      clientName: 'Clara Clara',
      clientId: 'P-102',
      serviceType: 'Dental Prophylaxis',
      status: 'completed',
      priority: 'medium',
      assignedStaff: 'Dr. Evelyn Martinez',
      dateCreated: '2026-05-28',
      dueDate: '2026-05-28',
      remarks: 'Annual dental polishing. Teeth look great. Prescribed fluoride wash.',
    }
  ],
  training: [
    {
      id: 'EN-201',
      clientName: 'Maria Santos',
      clientId: 'S-101',
      serviceType: 'Caregiving NC II Course',
      status: 'in_progress',
      priority: 'high',
      assignedStaff: 'Elena Rostova (Lead Instructor)',
      dateCreated: '2026-05-20',
      dueDate: '2026-06-15',
      remarks: 'Midterm exams passed. Caregiving practical checklist 70% complete.',
    },
    {
      id: 'EN-202',
      clientName: 'Juan Dela Cruz',
      clientId: 'S-102',
      serviceType: 'IELTS Preparation Module',
      status: 'new',
      priority: 'medium',
      assignedStaff: 'Jameson Cole (Language Tutor)',
      dateCreated: '2026-06-03',
      dueDate: '2026-06-30',
      remarks: 'Awaiting registration slip fee clearing before starting sessions.',
    }
  ],
  logistics: [
    {
      id: 'BK-201',
      clientName: 'Manila Port Traders',
      clientId: 'L-101',
      serviceType: 'Container Port Cargo',
      status: 'new',
      priority: 'high',
      assignedStaff: 'Jameson Cole (Logistics Lead)',
      dateCreated: '2026-06-05',
      dueDate: '2026-06-10',
      remarks: 'Dispatching 40ft container to Manila Harbor. Manifest pending check.',
    },
    {
      id: 'BK-202',
      clientName: 'Cebu Transit Solutions',
      clientId: 'L-102',
      serviceType: 'Domestic LTL Transit',
      status: 'in_progress',
      priority: 'medium',
      assignedStaff: 'David Vance (Fleet Manager)',
      dateCreated: '2026-06-02',
      dueDate: '2026-06-08',
      remarks: 'Pallets allocated to Truck #3. En route to Cebu pier depot.',
    }
  ],
  distributor: [
    {
      id: 'PO-201',
      clientName: 'SM Wholesale Accounts',
      clientId: 'D-101',
      serviceType: 'Electronics Batch 201',
      status: 'waiting',
      priority: 'high',
      assignedStaff: 'David Vance (Inventory Lead)',
      dateCreated: '2026-06-02',
      dueDate: '2026-06-20',
      remarks: 'Smart Hub shipments. Waiting on stock verification from supplier.',
    },
    {
      id: 'PO-202',
      clientName: 'Robinson Supermarket Co',
      clientId: 'D-102',
      serviceType: 'Frozen Goods Pallets',
      status: 'new',
      priority: 'medium',
      assignedStaff: 'Elena Rostova (Logistics Rep)',
      dateCreated: '2026-06-05',
      dueDate: '2026-06-12',
      remarks: 'Intake PO scheduled. Cold-chain trailer assigned.',
    }
  ],
  service: [
    {
      id: 'TK-201',
      clientName: 'Tech Startup Manila',
      clientId: 'V-101',
      serviceType: 'Financial Audit 2026',
      status: 'in_progress',
      priority: 'high',
      assignedStaff: 'Sarah K. (Senior Auditor)',
      dateCreated: '2026-05-18',
      dueDate: '2026-06-18',
      remarks: 'Internal bookkeeping files compiled. Audit report drafted.',
    },
    {
      id: 'TK-202',
      clientName: 'Alpha Law Firm',
      clientId: 'V-102',
      serviceType: 'Cloud AWS Migration',
      status: 'new',
      priority: 'medium',
      assignedStaff: 'Jameson Cole (IT Lead)',
      dateCreated: '2026-06-04',
      dueDate: '2026-06-15',
      remarks: 'Scoping database sizing. Staging AWS environment provisioned.',
    }
  ]
};

// ==========================================
// 3. WORKFLOWS (Tasks Kanban) by Industry
// ==========================================
export const defaultWorkflows: Record<IndustryType, WorkflowItem[]> = {
  general: [
    {
      id: 'TSK-101',
      title: 'Review customer intake sheet',
      clientName: 'Sarah Jenkins',
      clientId: 'C-101',
      transactionId: 'TX-201',
      assignedTo: 'Elena Rostova',
      status: 'in_progress',
      deadline: '2026-06-07',
      priority: 'high',
    }
  ],
  clinic: [
    {
      id: 'TSK-201',
      title: 'Prepare Pedro Penduko cardiology chart',
      clientName: 'Pedro Penduko',
      clientId: 'P-101',
      transactionId: 'AP-201',
      assignedTo: 'Dr. Grayson (Cardiologist)',
      status: 'in_progress',
      deadline: '2026-06-06',
      priority: 'high',
    },
    {
      id: 'TSK-202',
      title: 'Sanitize dental consultation chair B',
      assignedTo: 'Clinic Ops Staff',
      status: 'done',
      deadline: '2026-06-05',
      priority: 'medium',
    }
  ],
  training: [
    {
      id: 'TSK-301',
      title: 'Assess Maria Santos Caregiving manual check',
      clientName: 'Maria Santos',
      clientId: 'S-101',
      transactionId: 'EN-201',
      assignedTo: 'Elena Rostova (Instructor)',
      status: 'in_progress',
      deadline: '2026-06-08',
      priority: 'high',
    },
    {
      id: 'TSK-302',
      title: 'Verify diagnostic IELTS speaking score',
      clientName: 'Juan Dela Cruz',
      clientId: 'S-102',
      transactionId: 'EN-202',
      assignedTo: 'Jameson Cole (Language Tutor)',
      status: 'todo',
      deadline: '2026-06-10',
      priority: 'medium',
    }
  ],
  logistics: [
    {
      id: 'TSK-401',
      title: 'Validate custom manifest codes',
      clientName: 'Manila Port Traders',
      clientId: 'L-101',
      transactionId: 'BK-201',
      assignedTo: 'Jameson Cole (Logistics Lead)',
      status: 'todo',
      deadline: '2026-06-08',
      priority: 'high',
    },
    {
      id: 'TSK-402',
      title: 'Verify LTL trailer driver drug test logs',
      clientName: 'Cebu Transit Solutions',
      clientId: 'L-102',
      transactionId: 'BK-202',
      assignedTo: 'David Vance (Fleet Manager)',
      status: 'done',
      deadline: '2026-06-04',
      priority: 'medium',
    }
  ],
  distributor: [
    {
      id: 'TSK-501',
      title: 'Verify smart hub stock levels in Pallet D',
      clientName: 'SM Wholesale Accounts',
      clientId: 'D-101',
      transactionId: 'PO-201',
      assignedTo: 'David Vance (Inventory Lead)',
      status: 'in_progress',
      deadline: '2026-06-10',
      priority: 'high',
    },
    {
      id: 'TSK-502',
      title: 'Confirm cold-chain dispatch checklist',
      clientName: 'Robinson Supermarket Co',
      clientId: 'D-102',
      transactionId: 'PO-202',
      assignedTo: 'Elena Rostova (Logistics Rep)',
      status: 'todo',
      deadline: '2026-06-09',
      priority: 'medium',
    }
  ],
  service: [
    {
      id: 'TSK-601',
      title: 'Draft monthly SEC tax statement outline',
      clientName: 'Tech Startup Manila',
      clientId: 'V-101',
      transactionId: 'TK-201',
      assignedTo: 'Sarah K. (Senior Auditor)',
      status: 'in_progress',
      deadline: '2026-06-09',
      priority: 'high',
    },
    {
      id: 'TSK-602',
      title: 'Setup AWS backup security group policy',
      clientName: 'Alpha Law Firm',
      clientId: 'V-102',
      transactionId: 'TK-202',
      assignedTo: 'Jameson Cole (IT Lead)',
      status: 'todo',
      deadline: '2026-06-12',
      priority: 'medium',
    }
  ]
};

// ==========================================
// 4. SCHEDULE EVENTS by Industry
// ==========================================
export const defaultSchedule: Record<IndustryType, ScheduleEvent[]> = {
  general: [
    {
      id: 'SC-101',
      title: 'General Consultation',
      date: '2026-06-06',
      time: '10:00 - 11:30',
      type: 'appointment',
      status: 'scheduled',
      assignedStaff: 'Elena Rostova',
    }
  ],
  clinic: [
    {
      id: 'SC-201',
      title: 'Cardiology Consultation',
      clientName: 'Pedro Penduko',
      clientId: 'P-101',
      date: '2026-06-06',
      time: '14:00 - 15:30',
      type: 'appointment',
      status: 'scheduled',
      assignedStaff: 'Dr. Grayson (Cardiologist)',
    }
  ],
  training: [
    {
      id: 'SC-301',
      title: 'Caregiving Practical Lab Session',
      clientName: 'Maria Santos',
      clientId: 'S-101',
      date: '2026-06-06',
      time: '09:00 - 12:00',
      type: 'class',
      status: 'scheduled',
      assignedStaff: 'Elena Rostova (Lead Instructor)',
    }
  ],
  logistics: [
    {
      id: 'SC-401',
      title: 'Seattle Port Container Load Dispatch',
      clientName: 'Manila Port Traders',
      clientId: 'L-101',
      date: '2026-06-06',
      time: '13:00 - 16:00',
      type: 'delivery',
      status: 'scheduled',
      assignedStaff: 'Jameson Cole (Logistics Lead)',
    }
  ],
  distributor: [
    {
      id: 'SC-501',
      title: 'SM Pallet Drop-off Inspection',
      clientName: 'SM Wholesale Accounts',
      clientId: 'D-101',
      date: '2026-06-06',
      time: '10:00 - 12:00',
      type: 'delivery',
      status: 'scheduled',
      assignedStaff: 'David Vance (Inventory Lead)',
    }
  ],
  service: [
    {
      id: 'SC-601',
      title: 'AWS Migration Alignment Call',
      clientName: 'Alpha Law Firm',
      clientId: 'V-102',
      date: '2026-06-06',
      time: '15:00 - 16:00',
      type: 'appointment',
      status: 'scheduled',
      assignedStaff: 'Jameson Cole (IT Lead)',
    }
  ]
};

// ==========================================
// 5. BILLING LEDGER (Invoices) by Industry
// ==========================================
export const defaultBilling: Record<IndustryType, BillingItem[]> = {
  general: [
    {
      id: 'BL-101',
      clientId: 'C-101',
      clientName: 'Sarah Jenkins',
      reference: 'INV-GEN-101',
      amount: 450.00,
      status: 'paid',
      dueDate: '2026-06-01',
      paymentMethod: 'Bank Transfer',
      notes: 'Cleared fees.',
    }
  ],
  clinic: [
    {
      id: 'BL-201',
      clientId: 'P-101',
      clientName: 'Pedro Penduko',
      reference: 'REF-MED-101',
      amount: 350.00,
      status: 'paid',
      dueDate: '2026-06-03',
      paymentMethod: 'Credit Card',
      notes: 'Co-pay and cardiography consult fee cleared online.',
    },
    {
      id: 'BL-202',
      clientId: 'P-102',
      clientName: 'Clara Clara',
      reference: 'REF-MED-102',
      amount: 120.00,
      status: 'unpaid',
      dueDate: '2026-06-15',
      paymentMethod: 'Cash',
      notes: 'Pediatric dental checkup invoice.',
    }
  ],
  training: [
    {
      id: 'BL-301',
      clientId: 'S-101',
      clientName: 'Maria Santos',
      reference: 'REF-TRA-201',
      amount: 800.00,
      status: 'partial',
      dueDate: '2026-06-10',
      paymentMethod: 'Bank Transfer',
      notes: 'Downpayment $400 received. Balance due upon exam date.',
    },
    {
      id: 'BL-302',
      clientId: 'S-102',
      clientName: 'Juan Dela Cruz',
      reference: 'REF-TRA-202',
      amount: 500.00,
      status: 'unpaid',
      dueDate: '2026-06-25',
      paymentMethod: 'GCash',
      notes: 'IELTS Intensive review guide & workbook invoice.',
    }
  ],
  logistics: [
    {
      id: 'BL-401',
      clientId: 'L-101',
      clientName: 'Manila Port Traders',
      reference: 'REF-LOG-301',
      amount: 4500.00,
      status: 'unpaid',
      dueDate: '2026-06-15',
      paymentMethod: 'Wire Transfer',
      notes: 'Seattle port manifest freight carriage booking.',
    },
    {
      id: 'BL-402',
      clientId: 'L-102',
      clientName: 'Cebu Transit Solutions',
      reference: 'REF-LOG-302',
      amount: 1850.00,
      status: 'paid',
      dueDate: '2026-06-02',
      paymentMethod: 'Bank Deposit',
      notes: 'Visayas depot shipping clearing fees cleared.',
    }
  ],
  distributor: [
    {
      id: 'BL-501',
      clientId: 'D-101',
      clientName: 'SM Wholesale Accounts',
      reference: 'REF-DIS-401',
      amount: 12500.00,
      status: 'overdue',
      dueDate: '2026-05-30',
      paymentMethod: 'Bank Wire',
      notes: 'PO-201 smart hub dispatch. Net-45 credit terms expired.',
    },
    {
      id: 'BL-502',
      clientId: 'D-102',
      clientName: 'Robinson Supermarket Co',
      reference: 'REF-DIS-402',
      amount: 8200.00,
      status: 'unpaid',
      dueDate: '2026-06-12',
      paymentMethod: 'Bank Transfer',
      notes: 'Logistics cargo trailer invoice.',
    }
  ],
  service: [
    {
      id: 'BL-601',
      clientId: 'V-101',
      clientName: 'Tech Startup Manila',
      reference: 'REF-SER-501',
      amount: 1500.00,
      status: 'paid',
      dueDate: '2026-06-01',
      paymentMethod: 'GCash',
      notes: 'May audit retainer invoice. Cleared GCash.',
    },
    {
      id: 'BL-602',
      clientId: 'V-102',
      clientName: 'Alpha Law Firm',
      reference: 'REF-SER-502',
      amount: 3200.00,
      status: 'unpaid',
      dueDate: '2026-06-15',
      paymentMethod: 'Bank Transfer',
      notes: 'AWS cloud provisioning and setup retainer.',
    }
  ]
};

// ==========================================
// 6. DOCUMENTS PIPELINE by Industry
// ==========================================
export const defaultFiles: Record<IndustryType, FileItem[]> = {
  general: [
    {
      id: 'FL-101',
      name: 'Customer Agreement.pdf',
      clientName: 'Sarah Jenkins',
      clientId: 'C-101',
      transactionId: 'TX-201',
      status: 'approved',
      uploadedDate: '2026-05-22',
      remarks: 'Signed and registered.',
    }
  ],
  clinic: [
    {
      id: 'FL-201',
      name: 'Electrocardiogram Panel.pdf',
      clientName: 'Pedro Penduko',
      clientId: 'P-101',
      transactionId: 'AP-201',
      status: 'approved',
      uploadedDate: '2026-06-01',
      remarks: 'Signed off by Cardiology Lab Lead.',
    }
  ],
  training: [
    {
      id: 'FL-301',
      name: 'High School Transcript.pdf',
      clientName: 'Maria Santos',
      clientId: 'S-101',
      transactionId: 'EN-201',
      status: 'submitted',
      uploadedDate: '2026-05-22',
      remarks: 'Needs validation of details against database record.',
    }
  ],
  logistics: [
    {
      id: 'FL-401',
      name: 'Customs Declaration manifest.pdf',
      clientName: 'Manila Port Traders',
      clientId: 'L-101',
      transactionId: 'BK-201',
      status: 'for_review',
      uploadedDate: '2026-06-05',
      remarks: 'Awaiting port authorization clearance.',
    }
  ],
  distributor: [
    {
      id: 'FL-501',
      name: 'Warehouse Pallet Receipt.pdf',
      clientName: 'SM Wholesale Accounts',
      clientId: 'D-101',
      transactionId: 'PO-201',
      status: 'submitted',
      uploadedDate: '2026-06-03',
      remarks: 'Voucher signed by Section Manager.',
    }
  ],
  service: [
    {
      id: 'FL-601',
      name: 'Signed SLA Agreement.pdf',
      clientName: 'Tech Startup Manila',
      clientId: 'V-101',
      transactionId: 'TK-201',
      status: 'approved',
      uploadedDate: '2026-05-18',
      remarks: 'Standard digital waiver signed.',
    }
  ]
};

// ==========================================
// 7. MOCK ACTIVITY LOGS (Global)
// ==========================================
export const mockActivityLogs: ActivityLog[] = [
  {
    id: 'LOG-001',
    timestamp: '2026-06-06 19:42:12',
    user: 'Admin User',
    action: 'Changed Industry Profile',
    details: 'Switched system workspace configuration to active industry profile.',
    type: 'success',
  },
  {
    id: 'LOG-002',
    timestamp: '2026-06-06 18:15:33',
    user: 'Jameson Cole',
    action: 'Modified Settings',
    details: 'Customized workspace column titles and labels.',
    type: 'info',
  }
];

// Fallbacks to prevent typescript compilation errors in references
export const mockRecords = defaultRecords.general;
export const mockTransactions = defaultTransactions.general;
export const mockWorkflows = defaultWorkflows.general;
export const mockSchedule = defaultSchedule.general;
export const mockBilling = defaultBilling.general;
export const mockFiles = defaultFiles.general;
