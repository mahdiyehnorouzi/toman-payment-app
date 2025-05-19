import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CreditCard, Menu, X } from 'lucide-react';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = location.pathname === '/';

  return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to="/" className="flex items-center">
                  <CreditCard className="h-8 w-8 text-blue-600" />
                  <span className="ml-2 text-xl font-bold text-gray-900">PaymentHub</span>
                </Link>
                <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                      to="/"
                      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                          isActive
                              ? 'border-blue-500 text-gray-900'
                              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }`}
                  >
                    Payments
                  </Link>
                </nav>
              </div>

              <div className="-mr-2 flex items-center sm:hidden">
                <button
                    onClick={() => setIsMobileMenuOpen(prev => !prev)}
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                >
                  <span className="sr-only">Toggle menu</span>
                  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>

          {isMobileMenuOpen && (
              <div className="sm:hidden">
                <div className="pt-2 pb-3 space-y-1">
                  <Link
                      to="/"
                      className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                          isActive
                              ? 'bg-blue-50 border-blue-500 text-blue-700'
                              : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Payments
                  </Link>
                </div>
              </div>
          )}
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
  );
};

export default MainLayout;
