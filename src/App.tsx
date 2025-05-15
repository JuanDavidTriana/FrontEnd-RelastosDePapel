import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CatalogPage from './pages/CatalogPage';
import ContactPage from './pages/ContactPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import { CartProvider } from './hooks/useCart';
import { OrderHistoryProvider } from './hooks/useOrderHistory';
import theme from './theme';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CartProvider>
          <OrderHistoryProvider>
            <CssBaseline />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalogo" element={<CatalogPage />} />
              <Route path="/contacto" element={<ContactPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/historial" element={<OrderHistoryPage />} />
            </Routes>
          </OrderHistoryProvider>
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App; 