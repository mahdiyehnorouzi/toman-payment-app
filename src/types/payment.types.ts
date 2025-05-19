export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'cancelled';
export type PaymentType = 'invoice' | 'subscription' | 'deposit' | 'withdrawal';

export interface Payment {
  id: string;
  type: PaymentType;
  value: number;
  status: PaymentStatus;
  paid_at: string | null;
  description: string;
  recipient: string;
  currency: string;
  reference: string;
  created_at: string;
  updated_at: string;
}

export interface PaymentFilters {
  search: string;
  type: PaymentType | '';
  status: PaymentStatus | '';
  page: number;
  limit: number;
}

export interface PaymentsResponse {
  data: Payment[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}