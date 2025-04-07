import { ChangeEvent } from 'react';
import { User } from '../types/user';
import '../styles/global.scss';

interface FilterPanelProps {
  onFilter: (city: string) => void;
  users: User[];
  label: string;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilter, users, label }) => {
  const cities = Array.from(new Set(users.map(user => user.address.city)));

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onFilter(e.target.value);
  };

  return (
    <div className="filter-panel">
      <label htmlFor="city-filter">{label}</label>
      <select id="city-filter" onChange={handleFilterChange} defaultValue="">
        <option value="">All</option>
        {cities.map(city => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterPanel;