import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { ShoppingCart, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Navbar = () => {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Relastos de Papel
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" onClick={() => navigate('/libros')}>
            Libros
          </Button>
          <Button color="inherit" onClick={() => navigate('/autores')}>
            Autores
          </Button>

          {isAuthenticated ? (
            <>
              <IconButton color="inherit" onClick={() => navigate('/carrito')}>
                <ShoppingCart />
              </IconButton>
              <IconButton color="inherit" onClick={() => navigate('/perfil')}>
                <Person />
              </IconButton>
              <Button color="inherit" onClick={logout}>
                Cerrar Sesión
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/login')}>
                Iniciar Sesión
              </Button>
              <Button
                color="inherit"
                variant="outlined"
                onClick={() => navigate('/registro')}
              >
                Registrarse
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}; 