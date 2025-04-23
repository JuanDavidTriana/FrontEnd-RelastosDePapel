export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publicationYear: number;
  description?: string;
  coverImage?: string;
  price: number;
  stock: number;
}

export interface Author {
  id: number;
  name: string;
  biography: string;
  imageUrl?: string;
  books?: Book[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Order {
  id: number;
  userId: number;
  books: {
    bookId: number;
    quantity: number;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
} 