import React from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Button,
  Divider,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';
import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';

interface CartDropdownProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

const CartDropdown: React.FC<CartDropdownProps> = ({ anchorEl, onClose }) => {
  const { items, removeFromCart, updateQuantity, total } = useCart();

  const handleQuantityChange = (bookId: string, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      updateQuantity(bookId, newQuantity);
    } else {
      removeFromCart(bookId);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'absolute',
        top: '100%',
        right: 0,
        width: { xs: '100%', sm: '400px' },
        maxHeight: '80vh',
        overflowY: 'auto',
        zIndex: 1000,
        mt: 1,
        borderRadius: 2,
        display: anchorEl ? 'block' : 'none',
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ color: 'primary.main', mb: 2 }}>
          Carrito de Compras
        </Typography>
        
        {items.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <ShoppingCartIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
            <Typography color="text.secondary">
              Tu carrito está vacío
            </Typography>
          </Box>
        ) : (
          <>
            {items.map((item) => (
              <Box key={item.id} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    component="img"
                    src={item.imageUrl}
                    alt={item.title}
                    sx={{
                      width: 60,
                      height: 80,
                      objectFit: 'cover',
                      borderRadius: 1,
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" noWrap>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.author}
                    </Typography>
                    <Typography variant="body2" color="primary.main" sx={{ mt: 0.5 }}>
                      ${item.price.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography>{item.quantity}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                <Divider sx={{ my: 1 }} />
              </Box>
            ))}

            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="subtitle1">Total:</Typography>
                <Typography variant="subtitle1" color="primary.main">
                  ${total.toFixed(2)}
                </Typography>
              </Box>
              <Button
                component={Link}
                to="/checkout"
                variant="contained"
                fullWidth
                onClick={onClose}
                sx={{
                  py: 1,
                  borderRadius: 2,
                  textTransform: 'none',
                }}
              >
                Proceder al pago
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default CartDropdown; 