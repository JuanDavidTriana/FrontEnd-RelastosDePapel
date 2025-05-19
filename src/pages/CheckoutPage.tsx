import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  Stepper,
  Step,
  StepLabel,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  CreditCard as CreditCardIcon,
  AccountBalance as BankIcon,
  Payment as PaymentIcon,
  Receipt as ReceiptIcon,
} from '@mui/icons-material';
import { useCart } from '../hooks/useCart';
import { useOrderHistory } from '../hooks/useOrderHistory';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';

const steps = ['Resumen de compra', 'Método de pago', 'Confirmación'];

const CheckoutPage: React.FC = () => {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const { addOrder } = useOrderHistory();
  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [orderId, setOrderId] = useState<string | null>(null);
  const [shippingName, setShippingName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingPhone, setShippingPhone] = useState('');
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  // Si el carrito está vacío, mostrar mensaje y botón para volver al catálogo
  if (items.length === 0 && activeStep === 0) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Box sx={{ flex: 1, bgcolor: 'background.default', py: 8 }}>
          <Container maxWidth="sm">
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>
                Tu carrito está vacío
              </Typography>
              <Typography variant="body1" gutterBottom>
                Agrega productos para continuar con el proceso de compra.
              </Typography>
              <Button
                variant="contained"
                component={Link}
                to="/catalogo"
                sx={{ mt: 2 }}
              >
                Volver al catálogo
              </Button>
            </Paper>
          </Container>
        </Box>
        <Footer />
      </Box>
    );
  }

  const handleQuantityChange = (bookId: string, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      updateQuantity(bookId, newQuantity);
    } else {
      removeFromCart(bookId);
    }
  };

  const handleNext = () => {
    // Validación para el paso 1 (dirección de envío)
    if (activeStep === 0) {
      if (!shippingName || !shippingAddress || !shippingPhone) {
        setFormError('Por favor completa todos los campos de dirección de envío.');
        return;
      }
      setFormError('');
    }
    // Validación para el paso 2 (pago)
    if (activeStep === 1 && paymentMethod !== 'transfer') {
      if (!cardNumber || !cardName || !cardExpiry || !cardCVC) {
        setFormError('Por favor completa todos los campos de pago.');
        return;
      }
      setFormError('');
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = () => {
    // Generar ID de orden
    const newOrderId = Math.random().toString(36).substr(2, 9).toUpperCase();
    setOrderId(newOrderId);

    // Añadir orden al historial
    addOrder({
      items: items.map(item => ({
        id: item.id,
        title: item.title,
        author: item.author,
        price: item.price,
        quantity: item.quantity,
        imageUrl: item.imageUrl,
      })),
      total,
      status: 'completada',
      paymentMethod: paymentMethod === 'credit' ? 'Tarjeta de crédito' :
                    paymentMethod === 'debit' ? 'Tarjeta de débito' :
                    'Transferencia bancaria',
    });

    // Limpiar carrito
    clearCart();
    handleNext();
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                  Productos en el carrito
                </Typography>
                {items.map((item) => (
                  <Box key={item.id} sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      component="img"
                      src={item.imageUrl}
                      alt={item.title}
                      sx={{ width: 60, height: 80, objectFit: 'cover', borderRadius: 1, boxShadow: 1 }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1">{item.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.author}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Cantidad: {item.quantity}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="primary.main" sx={{ minWidth: 80, textAlign: 'right' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                ))}
              </Paper>
              <Paper sx={{ p: 3, mt: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                  Dirección de envío
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Nombre completo"
                      value={shippingName}
                      onChange={(e) => setShippingName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Teléfono"
                      value={shippingPhone}
                      onChange={(e) => setShippingPhone(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Dirección"
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Paper>
              {formError && (
                <Typography color="error" sx={{ mt: 2 }}>{formError}</Typography>
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                  Resumen del pedido
                </Typography>
                <Box sx={{ my: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Subtotal:</Typography>
                    <Typography>${total.toFixed(2)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Envío:</Typography>
                    <Typography>Gratis</Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6">Total:</Typography>
                    <Typography variant="h6" color="primary.main">
                      ${total.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
              Selecciona tu método de pago
            </Typography>
            <FormControl component="fieldset" sx={{ mt: 2 }}>
              <RadioGroup
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
              >
                <FormControlLabel
                  value="credit"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CreditCardIcon sx={{ mr: 1 }} />
                      Tarjeta de crédito
                    </Box>
                  }
                />
                <FormControlLabel
                  value="debit"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PaymentIcon sx={{ mr: 1 }} />
                      Tarjeta de débito
                    </Box>
                  }
                />
                <FormControlLabel
                  value="transfer"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <BankIcon sx={{ mr: 1 }} />
                      Transferencia bancaria
                    </Box>
                  }
                />
              </RadioGroup>
            </FormControl>

            {paymentMethod !== 'transfer' && (
              <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Número de tarjeta"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="1234 5678 9012 3456"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Nombre en la tarjeta"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Fecha de expiración"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/AA"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="CVC"
                      value={cardCVC}
                      onChange={(e) => setCardCVC(e.target.value)}
                      placeholder="123"
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            {paymentMethod === 'transfer' && (
              <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Datos bancarios para transferencia:
                </Typography>
                <Typography>
                  Banco: Banco de Colombia<br />
                  Cuenta: 1234-5678-9012-3456<br />
                  Titular: Relatos de Papel S.A.S<br />
                  Tipo: Cuenta Corriente
                </Typography>
              </Box>
            )}
            {formError && (
              <Typography color="error" sx={{ mt: 2 }}>{formError}</Typography>
            )}
          </Paper>
        );

      case 2:
        return (
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <ReceiptIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom sx={{ color: 'primary.main' }}>
              ¡Gracias por tu compra!
            </Typography>
            <Typography variant="body1" paragraph>
              Tu pedido ha sido procesado correctamente.
            </Typography>
            <Typography variant="body1" paragraph>
              Te enviaremos un correo electrónico con los detalles de tu compra.
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/historial"
              sx={{ mt: 4, px: 4 }}
            >
              Ir al historial de compras
            </Button>
          </Paper>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ flex: 1, bgcolor: 'background.default', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            align="center"
            sx={{
              color: 'primary.main',
              fontWeight: 700,
              mb: 6,
              '&:after': {
                content: '""',
                display: 'block',
                width: '100px',
                height: '4px',
                backgroundColor: 'primary.main',
                margin: '20px auto',
                borderRadius: '2px',
              }
            }}
          >
            Checkout
          </Typography>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {renderStepContent(activeStep)}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Atrás
            </Button>
            {activeStep < steps.length - 1 && (
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ ml: 1 }}
              >
                Siguiente
              </Button>
            )}
            {activeStep === steps.length - 1 && (
              <Button
                variant="contained"
                onClick={() => {
                  // Generar ID de orden y guardar en historial
                  const newOrderId = Math.random().toString(36).substr(2, 9).toUpperCase();
                  setOrderId(newOrderId);
                  addOrder({
                    items: items.map(item => ({
                      id: item.id,
                      title: item.title,
                      author: item.author,
                      price: item.price,
                      quantity: item.quantity,
                      imageUrl: item.imageUrl,
                    })),
                    total,
                    status: 'completada',
                    paymentMethod: paymentMethod === 'credit' ? 'Tarjeta de crédito' :
                                  paymentMethod === 'debit' ? 'Tarjeta de débito' :
                                  'Transferencia bancaria',
                  });
                  clearCart();
                  navigate('/historial');
                }}
                sx={{ ml: 1 }}
              >
                Finalizar compra
              </Button>
            )}
          </Box>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default CheckoutPage; 