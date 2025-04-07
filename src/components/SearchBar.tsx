import { ChangeEvent } from 'react';
import '../styles/global.scss';

interface SearchBarProps {
  onSearch: (term: string) => void;
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder }) => {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="search-bar">
      <input type="text" placeholder={placeholder} onChange={handleSearch} />
    </div>
  );
};

export default SearchBar;