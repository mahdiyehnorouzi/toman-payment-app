// src/utils/api.ts
import axios from 'axios';
import { Payment, PaymentFilters, PaymentsResponse } from '../types/payment.types';

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

// GET /payments with search, filters, pagination
export const getPayments = async (filters: PaymentFilters): Promise<PaymentsResponse> => {
  const { search, type, status, page = 1, limit = 10 } = filters;

  const params: any = {
    page,
    limit,
  };

  if (search) params.search = search;
  if (type) params.type = type;
  if (status) params.status = status;

  const response = await api.get('/payments', { params });

  return {
    data: response.data.entities || [],
    total: response.data.total || 0,
    page: response.data.page || 1,
    limit: response.data.limit || 10,
    totalPages: Math.ceil((response.data.total || 0) / (response.data.limit || 10)),
  };
};

// GET /payments/:id
export const getPaymentById = async (id: string): Promise<Payment> => {
  try {
    const response = await api.get(`/payments/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch payment: ${error.message}`);
  }
};

export default api;
