export type UserRole = 'citizen' | 'candidate' | 'governor' | 'mp' | 'mca' | 'auditor' | 'journalist' | 'admin';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  location?: string;
  bio?: string;
  avatarUrl?: string;
  isVerified: boolean;
  createdAt: string;
}

export interface Budget {
  id: string;
  region: string;
  fiscalYear: string;
  totalAmount: number;
  recurrentSpending: number;
  developmentSpending: number;
  categories: { [key: string]: number };
  updatedAt: string;
}

export interface PriorityDemand {
  id: string;
  title: string;
  description: string;
  category: string;
  region: string;
  authorId: string;
  votesCount: number;
  status: 'active' | 'merged' | 'in-negotiation' | 'contracted';
  createdAt: string;
}

export interface Commitment {
  title: string;
  description: string;
  targetDate: string;
  progress: number;
  status: 'pending' | 'in-progress' | 'completed' | 'stalled';
}

export interface GovernanceContract {
  id: string;
  candidateId: string;
  region: string;
  commitments: Commitment[];
  status: 'draft' | 'signed' | 'active' | 'completed';
  signedAt: string;
  auditTrailId: string;
}

export interface Project {
  id: string;
  contractId: string;
  title: string;
  description: string;
  budget: number;
  contractor: string;
  progress: number;
  location: { lat: number; lng: number; name: string };
  status: string;
  startDate: string;
  expectedCompletion: string;
  evidenceUrls: string[];
}

export interface Vote {
  userId: string;
  timestamp: string;
}

export interface DiscussionMessage {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
}

export interface LLMResult {
  id: string;
  contextType: 'proposal' | 'discussion' | 'budget';
  contextId: string;
  summary: string;
  rawOutput: any;
  createdAt: string;
}

export interface CivilReport {
  id: string;
  projectId: string;
  authorId: string;
  type: 'progress' | 'corruption' | 'stalled' | 'feedback';
  content: string;
  mediaUrls: string[];
  isVerified: boolean;
  createdAt: string;
}
