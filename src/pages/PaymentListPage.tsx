import { useEffect } from 'react';
import { usePaymentContext } from '../context/PaymentContext';
import SearchBar from '../components/payments/SearchBar';
import PaymentFilters from '../components/payments/PaymentFilters';
import PaymentList from '../components/payments/PaymentList';
import Pagination from '../components/common/Pagination';
import { AlertCircle } from 'lucide-react';

const PaymentListPage = () => {
    const {
        payments,
        isLoading,
        error,
        total,
        totalPages,
        filters,
        updateFilters,
        resetFilters,
        fetchPayments,
    } = usePaymentContext();

    useEffect(() => {
        fetchPayments();
    }, [filters]);

    const handleSearch = (value: string) => updateFilters({ search: value });
    const handleFilterChange = (key: keyof typeof filters, value: string) => {
        updateFilters({ [key]: value });
    };
    const handlePageChange = (page: number) => updateFilters({ page });

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Payments</h1>
                <p className="text-gray-600">Manage and track all your payment transactions</p>
            </div>

            <div className="mb-6">
                <SearchBar initialValue={filters.search} onSearch={handleSearch} />
            </div>

            <PaymentFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={resetFilters}
            />

            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <AlertCircle className="h-5 w-5 text-red-500" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            <PaymentList payments={payments} isLoading={isLoading} error={error} />

            {!isLoading && !error && totalPages > 1 && (
                <div className="mt-6">
                    <Pagination
                        currentPage={filters.page}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}

            {!isLoading && !error && payments.length > 0 && (
                <div className="mt-6 text-sm text-gray-500">
                    Showing {payments.length} of {total} payments
                </div>
            )}

        </div>
    );
};

export default PaymentListPage;