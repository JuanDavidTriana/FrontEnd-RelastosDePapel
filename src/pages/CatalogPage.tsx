import React from 'react';
import { Box } from '@mui/material';
import BookCatalog from '../components/BookCatalog';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Datos de ejemplo - En un caso real, estos vendrían de una API
const sampleBooks = [
  {
    id: '1',
    title: 'El Principito',
    author: 'Antoine de Saint-Exupéry',
    price: 19.99,
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Una obra poética y filosófica que ha cautivado a lectores de todas las edades.',
  },
  {
    id: '2',
    title: 'Cien años de soledad',
    author: 'Gabriel García Márquez',
    price: 24.99,
    imageUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'La obra maestra del realismo mágico que narra la historia de la familia Buendía.',
  },
  {
    id: '3',
    title: 'Don Quijote de la Mancha',
    author: 'Miguel de Cervantes',
    price: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'La obra cumbre de la literatura española y una de las más importantes de la literatura universal.',
  },
  {
    id: '4',
    title: '1984',
    author: 'George Orwell',
    price: 22.99,
    imageUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Una distopía que explora los peligros del totalitarismo y la vigilancia masiva.',
  },
  {
    id: '5',
    title: 'El Señor de los Anillos',
    author: 'J.R.R. Tolkien',
    price: 34.99,
    imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'La épica historia de la Tierra Media y la lucha contra el poder del Anillo Único.',
  },
  {
    id: '6',
    title: 'Orgullo y Prejuicio',
    author: 'Jane Austen',
    price: 18.99,
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Una historia de amor y superación de prejuicios en la Inglaterra del siglo XIX.',
  },
  {
    id: '7',
    title: 'Los Miserables',
    author: 'Victor Hugo',
    price: 27.99,
    imageUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Una obra maestra que retrata la lucha por la redención y la justicia social.',
  },
  {
    id: '8',
    title: 'El Alquimista',
    author: 'Paulo Coelho',
    price: 16.99,
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Una novela filosófica que sigue el viaje de un joven pastor en busca de su tesoro personal.',
  }
];

const CatalogPage: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ flex: 1, bgcolor: 'background.default' }}>
        <BookCatalog books={sampleBooks} />
      </Box>
      <Footer />
    </Box>
  );
};

export default CatalogPage; 