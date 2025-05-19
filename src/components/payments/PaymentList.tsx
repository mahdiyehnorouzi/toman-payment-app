import { AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PaymentCard from './PaymentCard';
import EmptyState from '../common/EmptyState';
import Spinner from '../common/Spinner';
import { Payment } from '../../types/payment.types';

interface PaymentListProps {
  payments: Payment[];
  isLoading: boolean;
  error: string | null;
}

const PaymentList = ({ payments, isLoading, error }: PaymentListProps) => {
  const navigate = useNavigate();

  const handleClick = (id: string) => navigate(`/payments/${id}`);

  if (isLoading) {
    return (
        <div className="flex justify-center items-center py-12">
          <Spinner size="lg" />
        </div>
    );
  }

  if (error) {
    return (
        <EmptyState
            title="Error loading payments"
            description={error}
            icon={<AlertCircle size={48} className="text-red-500" />}
        />
    );
  }

  if (payments.length === 0) {
    return (
        <EmptyState
            title="No payments found"
            description="Try adjusting your search or filter to find what you're looking for."
        />
    );
  }

  return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {payments.map((payment) => (
            <PaymentCard
                key={payment.id}
                payment={payment}
                onClick={() => handleClick(payment.id)}
            />
        ))}
      </div>
  );
};

export default PaymentList;
