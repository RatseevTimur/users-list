import { useQuery } from 'react-query';
import { fetchUsers, fetchUserById } from '../api/users';
import { User } from '../types/user'

export const useUsers = () => {
  return useQuery<User[], Error>('users', fetchUsers, {
    staleTime: 5 * 60 * 1000, // Кэш на 5 минут
    cacheTime: 10 * 60 * 1000, // Хранение в кэше 10 минут
  });
};

export const useUser = (id: number) => {
  return useQuery<User, Error>(['user', id], () => fetchUserById(id), {
    enabled: !!id, // Запрос только при наличии id
  });
};