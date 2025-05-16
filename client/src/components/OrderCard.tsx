import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Order } from '../types/order';


interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("here")
    navigate(`/orders/${order.id}`);
  };

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6">{order.customerName}</Typography>
          <Chip label={order.status} color="primary" size="small" />
        </Box>

        <Typography variant="body2" color="textSecondary">
          {order.orderType.toUpperCase()} • {new Date(order.createdAt).toLocaleString()}
        </Typography>

        <Typography variant="body1" mt={1}>
          Items: {order.items.length} | Total: ${order.total.toFixed(2)}
        </Typography>

        <Box mt={2} textAlign="right">
          <Button variant="outlined" size="small" onClick={handleClick}>
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
