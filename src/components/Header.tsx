import { 
  AppBar, 
  Toolbar, 
  Box, 
  InputBase,
  IconButton,
  styled,
  Badge,
} from '@mui/material';
import { Search as SearchIcon, ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import logo from '../assets/images/logoRelatosDePapel.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import CartDropdown from './CartDropdown';
import { useCart } from '../hooks/useCart';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#FDF6F2',
  '&:hover': {
    backgroundColor: '#f5e6e0',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.main,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
}));

const NavLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  padding: '8px 16px',
  borderRadius: theme.shape.borderRadius,
  transition: 'background-color 0.3s',
  '&:hover': {
    backgroundColor: '#FDF6F2',
  },
}));

export default function Header() {
  const [cartAnchorEl, setCartAnchorEl] = useState<HTMLElement | null>(null);
  const { items } = useCart();

  const handleCartClick = (event: React.MouseEvent<HTMLElement>) => {
    setCartAnchorEl(event.currentTarget);
  };

  const handleCartClose = () => {
    setCartAnchorEl(null);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: 'white',
        boxShadow: 'none',
        borderBottom: '1px solid',
        borderColor: 'primary.light',
        py: 2
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: { xs: '80px', md: '100px' } }}>
        <Box 
          component={Link} 
          to="/" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            textDecoration: 'none',
            ml: { xs: -1, md: 0 }
          }}
        >
          <Box 
            component="img"
            src={logo}
            alt="Logo"
            sx={{ 
              height: { xs: 100, md: 120 },
              width: 'auto',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          />
        </Box>

        <Search sx={{ 
          maxWidth: { xs: '200px', sm: '300px', md: '400px' },
          mx: { xs: 1, md: 2 }
        }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Buscar libros, autores.."
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: { xs: 1, md: 2 },
          mr: { xs: 1, md: 3 }
        }}>
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/catalogo">Catálogo</NavLink>
          <NavLink to="/contacto">Contacto</NavLink>
          <Box sx={{ position: 'relative' }}>
            <IconButton 
              color="primary"
              onClick={handleCartClick}
              sx={{ 
                ml: { xs: 0.5, md: 1 },
                '&:hover': {
                  backgroundColor: '#FDF6F2',
                }
              }}
            >
              <Badge badgeContent={totalItems} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <CartDropdown
              anchorEl={cartAnchorEl}
              onClose={handleCartClose}
            />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
} 