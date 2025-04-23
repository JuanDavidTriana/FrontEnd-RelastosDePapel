import axios from 'axios';
import { Book, Author, User, Order } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const bookService = {
  getAll: () => api.get<Book[]>('/books'),
  getById: (id: number) => api.get<Book>(`/books/${id}`),
  create: (book: Omit<Book, 'id'>) => api.post<Book>('/books', book),
  update: (id: number, book: Partial<Book>) => api.put<Book>(`/books/${id}`, book),
  delete: (id: number) => api.delete(`/books/${id}`),
};

export const authorService = {
  getAll: () => api.get<Author[]>('/authors'),
  getById: (id: number) => api.get<Author>(`/authors/${id}`),
  create: (author: Omit<Author, 'id'>) => api.post<Author>('/authors', author),
  update: (id: number, author: Partial<Author>) => api.put<Author>(`/authors/${id}`, author),
  delete: (id: number) => api.delete(`/authors/${id}`),
};

export const userService = {
  login: (email: string, password: string) => api.post<{ user: User; token: string }>('/auth/login', { email, password }),
  register: (user: Omit<User, 'id'>) => api.post<User>('/auth/register', user),
  getProfile: () => api.get<User>('/auth/profile'),
};

export const orderService = {
  getAll: () => api.get<Order[]>('/orders'),
  getById: (id: number) => api.get<Order>(`/orders/${id}`),
  create: (order: Omit<Order, 'id' | 'createdAt'>) => api.post<Order>('/orders', order),
  updateStatus: (id: number, status: Order['status']) => api.patch<Order>(`/orders/${id}/status`, { status }),
}; 