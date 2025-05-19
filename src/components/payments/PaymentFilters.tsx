import { Filter, X } from 'lucide-react';
import Select from '../common/Select';
import Button from '../common/Button';
import { PaymentFilters as Filters } from '../../types/payment.types';

interface PaymentFiltersProps {
    filters: Filters;
    onFilterChange: (key: keyof Filters, value: string) => void;
    onReset: () => void;
}

const PaymentFilters = ({
                            filters,
                            onFilterChange,
                            onReset,
                        }: PaymentFiltersProps) => {
    const isFiltered = filters.type !== '' || filters.status !== '';

    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900 flex items-center">
                    <Filter size={20} className="mr-2" />
                    Filters
                </h2>
                {isFiltered && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onReset}
                        leftIcon={<X size={16} />}
                    >
                        Clear filters
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                    label="Payment Type"
                    value={filters.type}
                    onChange={(value) => onFilterChange('type', value)}
                    options={[
                        { value: '', label: 'All payment types' },
                        { value: 'invoice', label: 'Invoice' },
                        { value: 'subscription', label: 'Subscription' },
                        { value: 'deposit', label: 'Deposit' },
                        { value: 'withdrawal', label: 'Withdrawal' },
                    ]}
                />
                <Select
                    label="Payment Status"
                    value={filters.status}
                    onChange={(value) => onFilterChange('status', value)}
                    options={[
                        { value: '', label: 'All statuses' },
                        { value: 'pending', label: 'Pending' },
                        { value: 'completed', label: 'Completed' },
                        { value: 'failed', label: 'Failed' },
                        { value: 'cancelled', label: 'Cancelled' },
                    ]}
                />
            </div>
        </div>
    );
};

export default PaymentFilters;
