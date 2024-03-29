import { GET, POST, PUT } from './config';
import { AuthProps, UserProps } from '../types';

export const registerUser = (body: { user: AuthProps }) => POST('/users', body);

export const loginUser = (body: { user: AuthProps }) =>
  POST('/users/login', body);

export const getUser = () => GET('/user');

export const updateUser = (body: { user: UserProps }) => PUT('/user', body);
