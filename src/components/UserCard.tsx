import { User } from '../types/user';
import { Link } from 'react-router-dom';
import '../styles/global.scss';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>City: {user.address.city}</p>
      <Link to={`/user/${user.id}`} className="details-link">
        View Details
      </Link>
    </div>
  );
};

export default UserCard;