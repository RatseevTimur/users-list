import { useParams } from 'react-router-dom';
import { useUser } from '../hooks/useUsers';

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading } = useUser(Number(id));

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="user-details">
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Address: {user.address.street}, {user.address.city}</p>
      <p>Phone: {user.phone}</p>
      <p>Website: {user.website}</p>
      <p>Company: {user.company.name}</p>
    </div>
  );
};

export default UserDetails;