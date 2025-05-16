import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
  Button,
  Paper,
  Divider,
  Alert,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchOrderById, updateOrder } from '../services/orderService';
import { Order, OrderStatus, OrderUpdatePayload } from '../types/order';

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState<OrderStatus>('pending');
  const [notes, setNotes] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        setLoading(true);
        const data = await fetchOrderById(id!);
        setOrder(data);
        setStatus(data.status);
        setNotes(data.preparationNotes || '');
      } catch (err) {
        console.error(err);
        setError('Failed to load order.');
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [id]);

  const handleUpdate = async () => {
    try {
      setUpdating(true);
      setSuccess(false);
      setError(null);
      const payload: OrderUpdatePayload = {
        status,
        preparationNotes: notes,
      };
      const updated = await updateOrder(id!, payload);
      setOrder(updated);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError('Failed to update order.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!order) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h6" color="error">
          Order not found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Button onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        ← Back
      </Button>

      <Typography variant="h4" gutterBottom>
        Order #{order.id}
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>Order updated!</Alert>}

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6">Customer</Typography>
        <Typography>{order.customerName}</Typography>
        <Typography color="textSecondary">{order.customerEmail}</Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6">Order Info</Typography>
        <Typography>Type: {order.orderType}</Typography>
        <Typography>Status: {order.status}</Typography>
        <Typography>Created: {new Date(order.createdAt).toLocaleString()}</Typography>
        {order.scheduledFor && (
          <Typography>Scheduled: {new Date(order.scheduledFor).toLocaleString()}</Typography>
        )}

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6">Items</Typography>
        {order.items.map((item) => (
          <Box key={item.id} sx={{ mb: 1 }}>
            <Typography>
              {item.quantity}x {item.name} — ${item.price.toFixed(2)}
            </Typography>
            {item.specialInstructions && (
              <Typography color="textSecondary" variant="body2">
                Note: {item.specialInstructions}
              </Typography>
            )}
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />
        <Typography variant="h6">Total: ${order.total.toFixed(2)}</Typography>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Update Order
        </Typography>

        <Grid container spacing={2}>
          <Grid>
            <Select
              fullWidth
              value={status}
              onChange={(e) => setStatus(e.target.value as OrderStatus)}
              variant="outlined"
            >
              {[
                'pending',
                'confirmed',
                'preparing',
                'ready',
                'delivered',
                'completed',
              ].map((s) => (
                <MenuItem key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid>
            <TextField
              fullWidth
              label="Preparation Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              multiline
              minRows={2}
            />
          </Grid>
        </Grid>

        <Box mt={3} textAlign="right">
          <Button
            variant="contained"
            onClick={handleUpdate}
            disabled={updating}
          >
            {updating ? 'Saving...' : 'Update Order'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default OrderDetail;
