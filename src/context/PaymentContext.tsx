import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { Payment, PaymentFilters, PaymentsResponse } from '../types/payment.types';
import { getPayments, getPaymentById } from '../utils/api';
import { usePaymentFilters } from '../hooks/usePaymentFilters';

interface PaymentContextType {
  payments: Payment[];
  payment: Payment | null;
  isLoading: boolean;
  error: string | null;
  total: number;
  totalPages: number;
  filters: PaymentFilters;
  updateFilters: (filters: Partial<PaymentFilters>) => void;
  resetFilters: () => void;
  fetchPayments: () => Promise<void>;
  fetchPaymentById: (id: string) => Promise<void>;
  clearCurrentPayment: () => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider = ({ children }: { children: ReactNode }) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [payment, setPayment] = useState<Payment | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [filters, updateFilters, resetFilters] = usePaymentFilters();

  const fetchPayments = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response: PaymentsResponse = await getPayments(filters);
      setPayments(response.data);
      setTotal(response.total);
      setTotalPages(response.totalPages);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch payments.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  const fetchPaymentById = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getPaymentById(id);
      setPayment(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch payment details.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearCurrentPayment = useCallback(() => setPayment(null), []);

  return (
      <PaymentContext.Provider
          value={{
            payments,
            payment,
            isLoading,
            error,
            total,
            totalPages,
            filters,
            updateFilters,
            resetFilters,
            fetchPayments,
            fetchPaymentById,
            clearCurrentPayment,
          }}
      >
        {children}
      </PaymentContext.Provider>
  );
};

export const usePaymentContext = () => {
  const context = useContext(PaymentContext);
  if (!context) throw new Error('usePaymentContext must be used within a PaymentProvider');
  return context;
};