import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import PaymentListPage from './pages/PaymentListPage';
import PaymentDetailsPage from './pages/PaymentDetailsPage';
import { PaymentProvider } from './context/PaymentContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PaymentProvider>
        <MainLayout>
          <PaymentListPage />
        </MainLayout>
      </PaymentProvider>
    ),
  },
  {
    path: '/payments/:id',
    element: (
      <PaymentProvider>
        <MainLayout>
          <PaymentDetailsPage />
        </MainLayout>
      </PaymentProvider>
    ),
  },
]);

export default router;