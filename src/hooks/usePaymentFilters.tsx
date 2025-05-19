import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PaymentFilters } from '../types/payment.types';

const DEFAULT_FILTERS: PaymentFilters = {
  search: '',
  type: '',
  status: '',
  page: 1,
  limit: 10,
};

export const usePaymentFilters = (): [
  PaymentFilters,
  (filters: Partial<PaymentFilters>) => void,
  () => void
] => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<PaymentFilters>(() => ({
    search: searchParams.get('search') || '',
    type: (searchParams.get('type') as any) || '',
    status: (searchParams.get('status') as any) || '',
    page: parseInt(searchParams.get('page') || '1', 10),
    limit: parseInt(searchParams.get('limit') || '10', 10),
  }));

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.type) params.set('type', filters.type);
    if (filters.status) params.set('status', filters.status);
    if (filters.page !== 1) params.set('page', filters.page.toString());
    if (filters.limit !== 10) params.set('limit', filters.limit.toString());
    setSearchParams(params);
  }, [filters, setSearchParams]);

  const updateFilters = (newFilters: Partial<PaymentFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: newFilters.search || newFilters.type || newFilters.status ? 1 : prev.page,
    }));
  };

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  return [filters, updateFilters, resetFilters];
};
