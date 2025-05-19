import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePaymentContext } from '../context/PaymentContext';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Spinner from '../components/common/Spinner';
import {
    ArrowLeft,
    AlertTriangle,
    CreditCard,
    Calendar,
    RefreshCw,
    Clock,
} from 'lucide-react';
import {
    formatCurrency,
    formatDate,
    getStatusColor,
    getTypeColor,
    capitalize,
} from '../utils/formatters';

const PaymentDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const {
        payment,
        isLoading,
        error,
        fetchPaymentById,
        clearCurrentPayment,
    } = usePaymentContext();

    useEffect(() => {
        if (id) fetchPaymentById(id);
        return () => clearCurrentPayment();
    }, [id, fetchPaymentById, clearCurrentPayment]);

    const handleBack = () => navigate('/');

    const renderDetail = (
        label: string,
        value: React.ReactNode,
        icon?: React.ReactNode
    ) => (
        <div className="mb-4">
            <div className="flex items-center text-sm font-medium text-gray-500 mb-1">
                {icon && <span className="mr-1">{icon}</span>}
                {label}
            </div>
            <div className="text-gray-900">{value}</div>
        </div>
    );

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Spinner size="lg" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <AlertTriangle size={48} className="text-red-500 mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Error Loading Payment
                </h2>
                <p className="text-gray-600 mb-6">{error}</p>
                <Button onClick={handleBack} leftIcon={<ArrowLeft size={16} />}>
                    Back to Payments
                </Button>
            </div>
        );
    }

    if (!payment) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <AlertTriangle size={48} className="text-yellow-500 mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Payment Not Found
                </h2>
                <p className="text-gray-600 mb-6">
                    The payment you're looking for doesn't exist or has been removed.
                </p>
                <Button onClick={handleBack} leftIcon={<ArrowLeft size={16} />}>
                    Back to Payments
                </Button>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center mb-6">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBack}
                    leftIcon={<ArrowLeft size={16} />}
                    className="mr-4"
                >
                    Back
                </Button>
                <h1 className="text-2xl font-bold text-gray-900">Payment Details</h1>
            </div>

            <Card className="mb-6 overflow-visible">
                <div className="border-b border-gray-200 px-6 py-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-medium text-gray-900">
                            Payment Information
                        </h2>
                        <div className="flex space-x-2">
                            <Badge
                                text={capitalize(payment.type)}
                                customColors={getTypeColor(payment.type)}
                            />
                            <Badge
                                text={capitalize(payment.status)}
                                customColors={getStatusColor(payment.status)}
                            />
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <div className="mb-6">
                                <div className="text-sm font-medium text-gray-500 mb-1">
                                    Amount
                                </div>
                                <div className="text-3xl font-semibold text-gray-900">
                                    {formatCurrency(payment.value, payment.currency)}
                                </div>
                            </div>

                            {renderDetail(
                                'Description',
                                payment.description || 'No description provided'
                            )}
                            {renderDetail('Recipient', payment.recipient)}
                            {renderDetail('Reference', payment.reference || 'No reference')}
                        </div>

                        <div>
                            {renderDetail(
                                'Payment Status',
                                capitalize(payment.status),
                                payment.status === 'completed' ? (
                                    <CreditCard size={16} />
                                ) : payment.status === 'pending' ? (
                                    <Clock size={16} />
                                ) : payment.status === 'failed' ? (
                                    <AlertTriangle size={16} />
                                ) : (
                                    <RefreshCw size={16} />
                                )
                            )}

                            {renderDetail(
                                'Payment Type',
                                capitalize(payment.type),
                                <CreditCard size={16} />
                            )}

                            {renderDetail(
                                'Payment Date',
                                payment.paid_at ? formatDate(payment.paid_at) : 'Not paid yet',
                                <Calendar size={16} />
                            )}

                            {renderDetail(
                                'Created At',
                                formatDate(payment.created_at),
                                <Calendar size={16} />
                            )}

                            {renderDetail(
                                'Updated At',
                                formatDate(payment.updated_at),
                                <Calendar size={16} />
                            )}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default PaymentDetailsPage;
