import { Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';
import { Book } from '../../types';

interface BookCardProps {
  book: Book;
  onAddToCart?: (book: Book) => void;
}

export const BookCard = ({ book, onAddToCart }: BookCardProps) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={book.coverImage || 'https://via.placeholder.com/200x300?text=No+Image'}
        alt={book.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h2">
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {book.author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Año: {book.publicationYear}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
          ${book.price.toFixed(2)}
        </Typography>
        {onAddToCart && (
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => onAddToCart(book)}
              disabled={book.stock === 0}
            >
              {book.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}; 