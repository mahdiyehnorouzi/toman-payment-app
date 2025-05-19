import { CreditCard, Clock, AlertCircle, CalendarClock } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { Payment } from '../../types/payment.types';
import {
  formatCurrency,
  formatDate,
  getStatusColor,
  getTypeColor,
  capitalize,
} from '../../utils/formatters';

interface PaymentCardProps {
  payment: Payment;
  onClick: () => void;
}

const PaymentCard = ({ payment, onClick }: PaymentCardProps) => {
  const getStatusIcon = () => {
    switch (payment.status) {
      case 'completed':
        return <CreditCard size={16} className="mr-1 text-green-600" />;
      case 'pending':
        return <Clock size={16} className="mr-1 text-yellow-600" />;
      case 'failed':
        return <AlertCircle size={16} className="mr-1 text-red-600" />;
      default:
        return <CalendarClock size={16} className="mr-1 text-gray-600" />;
    }
  };

  return (
      <Card hoverable onClick={onClick} className="p-4">
        <div className="flex flex-col">
          <div className="flex justify-between mb-3">
            <Badge
                text={capitalize(payment.type)}
                customColors={getTypeColor(payment.type)}
            />
            <Badge
                text={capitalize(payment.status)}
                customColors={getStatusColor(payment.status)}
            />
          </div>

          <div className="mb-2">
            <div className="text-lg font-semibold text-gray-900">
              {formatCurrency(payment.value, payment.currency)}
            </div>
            <div className="text-sm text-gray-600 truncate mt-1">
              {payment.description || 'No description'}
            </div>
          </div>

          <div className="flex items-center mt-auto text-xs text-gray-500">
            {getStatusIcon()}
            <span>
            {payment.paid_at
                ? 'Paid on ' + formatDate(payment.paid_at)
                : 'Not paid yet'}
          </span>
          </div>
        </div>
      </Card>
  );
};

export default PaymentCard;
