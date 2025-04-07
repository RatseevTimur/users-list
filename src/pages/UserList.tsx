import { Suspense, lazy, useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import Loading from '../components/Loading';
import { useSearchParams } from 'react-router-dom';

const UserTable = lazy(() => import('../components/UserTable'));

interface Translations {
  searchPlaceholder: string;
  filterByCity: string;
  tableHeaders: string[];
  noResults: string;
  title: string;
}

interface UserListProps {
  language: string;
  translations: Translations;
}

const ITEMS_PER_PAGE = 5;

const UserList: React.FC<UserListProps> = ({ language, translations }) => {
  const { data: users, isLoading } = useUsers();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCity, setFilterCity] = useState('');

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const setCurrentPage = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  const filteredUsers = users?.filter(user =>
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!filterCity || user.address.city === filterCity)
  ) || [];

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Table</title>
            <style>
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #007bff; color: white; }
            </style>
          </head>
          <body>
            <h1>${translations.title}</h1>
            <table>
              <thead>
                <tr>
                  ${translations.tableHeaders.map(header => `<th>${header}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${filteredUsers.map(user => `
                  <tr>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.address.city}</td>
                    <td>${user.company.name}</td>
                    <td>${user.id}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="user-list">
      <div className="controls">
        <SearchBar onSearch={setSearchTerm} placeholder={translations.searchPlaceholder} />
        <FilterPanel onFilter={setFilterCity} users={users || []} label={translations.filterByCity} />
      </div>
      <button onClick={handlePrint} className="print-button">
        {language === 'en' ? 'Print Table' : 'Печать таблицы'}
      </button>
      <Suspense fallback={<Loading />}>
        <UserTable
          users={paginatedUsers}
          headers={translations.tableHeaders}
          language={language}
          noResults={translations.noResults}
        />
      </Suspense>
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          {language === 'en' ? 'Previous' : 'Предыдущая'}
        </button>
        <span>
          {language === 'en' ? `Page ${currentPage} of ${totalPages}` : `Страница ${currentPage} из ${totalPages}`}
        </span>
        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          {language === 'en' ? 'Next' : 'Следующая'}
        </button>
      </div>
    </div>
  );
};

export default UserList;