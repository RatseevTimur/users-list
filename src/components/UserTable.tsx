import { useState } from 'react';
import { User } from '../types/user';
import { Link } from 'react-router-dom';
import '../styles/global.scss';

interface UserTableProps {
  users: User[];
  headers: string[];
  language: string;
  noResults: string;
}

const UserTable: React.FC<UserTableProps> = ({ users, headers, language, noResults }) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [notification, setNotification] = useState<string>('');

  const handleSort = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (!sortOrder) return 0;
    return sortOrder === 'asc'
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    const message = language === 'en' ? 'Data copied to clipboard' : 'Данные скопированы в буфер обмена';
    setNotification(message);
    setTimeout(() => setNotification(''), 2000);
  };

  return (
    <div className="user-table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th onClick={handleSort} className="sortable">
              {headers[0]} {sortOrder === 'asc' ? '↑' : sortOrder === 'desc' ? '↓' : '↕'}
            </th>
            {headers.slice(1).map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedUsers.length > 0 ? (
            sortedUsers.map(user => (
              <tr key={user.id} className="fade-in">
                <td onClick={() => copyToClipboard(user.name)}>{user.name}</td>
                <td onClick={() => copyToClipboard(user.email)}>{user.email}</td>
                <td onClick={() => copyToClipboard(user.address.city)}>{user.address.city}</td>
                <td onClick={() => copyToClipboard(user.company.name)}>{user.company.name}</td>
                <td>
                  <Link to={`/user/${user.id}`}>Details</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="no-results">{noResults}</td>
            </tr>
          )}
        </tbody>
      </table>
      {notification && <div className="notification">{notification}</div>}
    </div>
  );
};

export default UserTable;