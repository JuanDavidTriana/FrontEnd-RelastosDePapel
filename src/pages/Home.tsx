import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  useTheme
} from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookCard from '../components/BookCard';
import heroImage from '../assets/images/Hero.png';
import { LocalShipping, Book, Group } from '@mui/icons-material';

// Importar imágenes de libros
import libro1 from '../assets/images/libros/libro1.jpg';
import libro2 from '../assets/images/libros/libro2.jpg';
import libro3 from '../assets/images/libros/libro3.jpg';
import libro4 from '../assets/images/libros/libro4.jpg';

interface Benefit {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const benefits: Benefit[] = [
  {
    title: 'Entrega rápida',
    description: 'En 24-48 horas tendrás tu pedido en la puerta de tu casa',
    icon: <LocalShipping sx={{ fontSize: 40, color: 'white' }} />
  },
  {
    title: 'Selección curada',
    description: 'Cuidadosamente seleccionamos los mejores títulos para ti',
    icon: <Book sx={{ fontSize: 40, color: 'white' }} />
  },
  {
    title: 'Club de lectura',
    description: 'Únete a nuestra comunidad y comparte tu pasión por la lectura',
    icon: <Group sx={{ fontSize: 40, color: 'white' }} />
  }
];

const WaveTop = () => (
  <Box
    sx={{
      position: 'absolute',
      top: -1,
      left: 0,
      width: '100%',
      overflow: 'hidden',
      lineHeight: 0,
    }}
  >
    <svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      style={{
        position: 'relative',
        display: 'block',
        width: 'calc(100% + 1.3px)',
        height: '70px',
        transform: 'rotateY(180deg)',
      }}
    >
      <path
        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
        style={{ fill: '#FDF6F2' }}
      />
    </svg>
  </Box>
);

const WaveBottom = () => (
  <Box
    sx={{
      position: 'absolute',
      bottom: -1,
      left: 0,
      width: '100%',
      overflow: 'hidden',
      lineHeight: 0,
      transform: 'rotate(180deg)',
    }}
  >
    <svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      style={{
        position: 'relative',
        display: 'block',
        width: 'calc(100% + 1.3px)',
        height: '70px',
      }}
    >
      <path
        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
        style={{ fill: '#FDF6F2' }}
      />
    </svg>
  </Box>
);

// Mock data para libros destacados actualizada
const featuredBooks = [
  {
    id: 1,
    title: 'Libro Destacado 1', // Puedes cambiar el título si quieres
    author: 'Autor 1', // Puedes cambiar el autor si quieres
    imageUrl: libro1,
  },
  {
    id: 2,
    title: 'Libro Destacado 2',
    author: 'Autor 2',
    imageUrl: libro2,
  },
  {
    id: 3,
    title: 'Libro Destacado 3',
    author: 'Autor 3',
    imageUrl: libro3,
  },
  {
    id: 4,
    title: 'Libro Destacado 4',
    author: 'Autor 4',
    imageUrl: libro4,
  },
];

export default function Home() {
  const theme = useTheme();
  
  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Header />
      
      {/* Hero Section */}
      <Box 
        sx={{ 
          position: 'relative',
          minHeight: { xs: '100vh', md: '85vh' },
          display: 'flex',
          alignItems: 'center',
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: 'primary.main',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 1,
            [theme.breakpoints.up('md')]: {
              backgroundColor: 'transparent'
            }
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container justifyContent={{ xs: 'center', md: 'flex-end' }}>
            <Grid item xs={12} md={6}> 
              <Box
                sx={{
                  backgroundColor: { xs: 'rgba(255, 255, 255, 0.95)', md: 'rgba(255, 255, 255, 0.9)' },
                  p: { xs: 4, md: 6 },
                  borderRadius: 4,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  mx: { xs: 2, md: 0 },
                  my: { xs: 4, md: 0 },
                  textAlign: { xs: 'center', md: 'left' }
                }}
              >
                <Typography
                  component="h1"
                  variant="h2"
                  gutterBottom
                  sx={{ 
                    fontWeight: 'bold',
                    fontSize: { xs: '2.2rem', sm: '2.8rem', md: '4rem' },
                    lineHeight: 1.2,
                    color: 'primary.main',
                    textShadow: { xs: '2px 2px 4px rgba(0,0,0,0.1)', md: 'none' }
                  }}
                >
                  Descubre tu próxima gran lectura
                </Typography>
                <Typography 
                  variant="h5" 
                  paragraph
                  sx={{ 
                    fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.6rem' },
                    mb: 4,
                    color: 'text.secondary',
                    textShadow: { xs: '1px 1px 2px rgba(0,0,0,0.1)', md: 'none' }
                  }}
                >
                  Explora nuestro catálogo y encuentra el libro perfecto para ti
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ 
                    mt: 3, 
                    px: { xs: 4, md: 5 }, 
                    py: { xs: 1.2, md: 1.5 },
                    fontSize: { xs: '1.1rem', md: '1.1rem' },
                    minWidth: { xs: '200px', md: 'auto' }
                  }}
                >
                  Explorar catálogo
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Sección de Libros Destacados */}
      <Box 
        sx={{ 
          py: { xs: 6, md: 8 },
          px: { xs: 2, md: 4 },
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            component="h2" 
            sx={{ 
              textAlign: 'center', 
              mb: { xs: 4, md: 6 },
              color: 'primary.main',
              fontWeight: 'bold',
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            Libros Destacados
          </Typography>
          
          <Grid 
            container 
            spacing={{ xs: 2, md: 4 }}
            sx={{ 
              justifyContent: 'center',
              '& .MuiGrid-item': {
                display: 'flex',
                justifyContent: 'center'
              }
            }}
          >
            {featuredBooks.map((book, index) => (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={4} 
                lg={3} 
                key={index}
                sx={{
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    '& .MuiPaper-root': {
                      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                      borderColor: 'primary.main'
                    }
                  }
                }}
              >
                <BookCard 
                  title={book.title} 
                  author={book.author} 
                  imageUrl={book.imageUrl} 
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Sección de Beneficios */}
      <Box 
        sx={{ 
          py: { xs: 6, md: 8 },
          px: { xs: 2, md: 4 },
          bgcolor: 'background.default',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            component="h2" 
            sx={{ 
              textAlign: 'center', 
              mb: { xs: 4, md: 6 },
              color: 'primary.main',
              fontWeight: 'bold',
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            Beneficios de comprar aquí
          </Typography>
          
          <Grid 
            container 
            spacing={{ xs: 3, md: 4 }}
            sx={{ 
              justifyContent: 'center',
              '& .MuiGrid-item': {
                display: 'flex',
                justifyContent: 'center'
              }
            }}
          >
            {benefits.map((benefit, index) => (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={4} 
                key={index}
                sx={{
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  }
                }}
              >
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: { xs: 3, md: 4 },
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    bgcolor: 'background.paper',
                    borderRadius: 4,
                    border: '1px solid',
                    borderColor: 'primary.light',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'primary.light',
                      '& .MuiTypography-root': {
                        color: 'white',
                      },
                      '& .MuiSvgIcon-root': {
                        color: 'white',
                      }
                    }
                  }}
                >
                  <Box 
                    sx={{ 
                      width: 80, 
                      height: 80, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      mb: 3,
                      bgcolor: 'primary.light',
                      borderRadius: '50%',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        bgcolor: 'white',
                        '& .MuiSvgIcon-root': {
                          color: 'primary.main',
                        }
                      }
                    }}
                  >
                    {benefit.icon}
                  </Box>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    sx={{ 
                      mb: 2,
                      fontWeight: 'bold',
                      color: 'text.primary',
                      transition: 'color 0.3s ease'
                    }}
                  >
                    {benefit.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: 'text.secondary',
                      transition: 'color 0.3s ease'
                    }}
                  >
                    {benefit.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonial Section */}
      <Box sx={{ position: 'relative', bgcolor: 'primary.light', py: { xs: 8, md: 15 } }}>
        <WaveTop />
        <Container maxWidth="md">
          <Box 
            sx={{ 
              textAlign: 'center',
              bgcolor: 'white',
              p: { xs: 4, md: 6 },
              borderRadius: 4,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              mx: { xs: 2, md: 0 }
            }}
          >
            <Box 
              component="img" 
              src="/icons/coffee.svg" 
              alt="Café" 
              sx={{ 
                width: { xs: 48, md: 64 }, 
                mb: 4,
                filter: 'invert(60%) sepia(75%) saturate(1000%) hue-rotate(320deg) brightness(90%) contrast(85%)'
              }} 
            />
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                fontStyle: 'italic', 
                mb: 3,
                color: 'primary.main',
                fontWeight: 'light',
                fontSize: { xs: '1.5rem', md: '2rem' }
              }}
            >
              "Excelente selección de libros y un servicio inigualable.
              ¡Muy recomendado!"
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'text.secondary',
                fontWeight: 'bold',
                fontSize: { xs: '1rem', md: '1.25rem' }
              }}
            >
              Carlos M.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
              Miembro del club de lectura
            </Typography>
          </Box>
        </Container>
        <WaveBottom />
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
} 