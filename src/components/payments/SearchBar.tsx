import { useState, useEffect, FormEvent } from 'react';
import { Search, X } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';

interface SearchBarProps {
  initialValue: string;
  onSearch: (value: string) => void;
}

const SearchBar = ({ initialValue, onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex">
          <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by description..."
              className="rounded-r-none"
              leftIcon={<Search size={18} />}
              rightIcon={
                searchTerm ? (
                    <button
                        type="button"
                        onClick={() => {
                          setSearchTerm('');
                          onSearch('');
                        }}
                        className="text-gray-400 hover:text-gray-500"
                    >
                      <X size={16} />
                    </button>
                ) : null
              }
          />
          <Button
              type="submit"
              className="rounded-l-none"
          >
            Search
          </Button>
        </div>
      </form>
  );
};

export default SearchBar;
